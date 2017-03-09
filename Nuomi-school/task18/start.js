const http = require('http');
const url = require('url');
const mongoose = require('mongoose');
const crawler = require('./crawler');

//启动mongoDB，配置model
mongoose.connection.on('connection', () => console.log('mongoose connected!'));
mongoose.connection.on('error', (err) => console.log('mongoose error: ', err));
mongoose.connect('mongodb://127.0.0.1:27017/baidu');
const crawlerSchema = mongoose.Schema({
    code: String ,
    msg: String ,
    word: String ,
    time: Number ,
    dataList: [{abstract: String, link: String, pic: String, title: String}]
});
const crawlerData = mongoose.model('crawlerData', crawlerSchema);

//启动服务器
http.createServer(function (request,response){
    console.log('request received');
    let key = url.parse(request.url,true).query;
    request.on('data', function(chunk) {});
    request.on('end',async function (){
        if(key.word&&key.device){
            let crawlerResult = await crawler(key.word, key.device);   //调用crawler模块

            let newCrawlerData = new crawlerData(JSON.parse(crawlerResult));  //将传回的JSON字符串保存到数据库中
            newCrawlerData.save( (err)=> {
                if (err) return console.error(err);
            });
        }
        response.writeHead(200,{'Content-type':'text/plain'});
        response.write('Hellow World');
        response.end(); 
    });
}).listen(8000);
console.log('sever started');