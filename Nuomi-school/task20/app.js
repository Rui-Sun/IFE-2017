const Koa = require('koa');
const router = require('./routes');
const views = require('koa-views');
const app = new Koa();
const http = require('http').createServer(app.callback());
const io = require('socket.io')(http);
const async = require('async');
const crawl = require('./crawl');


app.use(require('koa-static')('./static'));

app.use(views(__dirname + '/views'));

app.use(router.routes());

//建立全局的异步队列，保证服务器内最多有五个爬取任务同时进行
//task内包含了爬取所需要的关键词、设备、页码，以及提交本次爬取任务的客户端的socket
const queue = async.queue(async function(task, callback) {
    let crawlInfo = await crawl(task, app);
    task.socket.emit('crawl message', JSON.stringify(crawlInfo));       //将爬取结果返回客户端
    callback();
}, 5);

//建立服务器和客户端直接的通信
io.on('connection', function(socket){
    socket.on('form submit', function(msg){
        console.log('message: ' + msg);
        let formInfo = JSON.parse(msg);
        for(item of formInfo.device){           //对每个设备的每一页，提交一次爬取任务
            for(let i = 0; i < formInfo.pages; i++){
                queue.push({word: formInfo.word, device: item, page: i+1, socket: socket}, (err) => {
                    if(err){
                        console.log(err);
                    }
                    console.log('items waiting to be processed:' + queue.length());
                    console.log('items running:' + queue.running());
                });
            }
        }
    });
});


http.listen(3000);
console.log('app started at port 3000...');