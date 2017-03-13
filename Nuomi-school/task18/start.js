const http = require('http');
const url = require('url');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const crawler = require('./crawler');
//启动mongoDB，配置model
mongoose.connect('mongodb://127.0.0.1:27017/baidu');
const db = mongoose.connection;
db.on('error', function (e) {
  console.log('mongoose error' + e)
});
db.once('open', function () {
  console.log('mongoose connected!')
});

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
    let data = '';
    request.addListener('data', function(chunk) {
        data += chunk;
    });
    let key = url.parse(request.url,true).query;
    request.on('end',async function (){
        if(request.url!=="/favicon.ico"){
            let crawlerResult = await crawler(key.word, key.device);    //调用crawler模块
            // console.log(crawlerResult);
            let newCrawlerData = new crawlerData(JSON.parse(crawlerResult));    //将传回的JSON字符串保存到数据库中
            newCrawlerData.save( (err)=> {
                if (err) return console.error(err);
            });
        }
        response.writeHead(200,{'Content-type':'text/plain'});
        response.write('Hellow World');
        response.write(data);
        response.end(); 
    });
    console.log('request received');
}).listen(8000);
console.log('sever started');