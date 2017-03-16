const crawler = require('../crawler/crawler');
const crawlerData = require('../crawler/mongodb');

//下载图片
const getImg = function (imgPath) {
    let promise = new Promise(function (resolve, reject) {
        const fs = require("fs"); 
        if(imgPath.startsWith('http://')){
            var http = require('http');
        }
        else if(imgPath.startsWith('https://')){
            var http = require('https');
        }
        http.get(imgPath, function(res){
            let imgData = "";
            res.setEncoding("binary"); 
            res.on("data", function(chunk){
                imgData+=chunk;
            });
            res.on("end", function(){
                fs.writeFile("./static/img/" + imgPath.replace(/[:/.]/g, '') + '.jpg', imgData, "binary", function(err){
                    if(err){
                        console.log(err);
                    }
                    console.log("down success");
                    resolve();
                });
            });
        });
    });
    return promise;
}

//配置路由
module.exports = {
    'GET /': async (ctx, next) => {
        await ctx.render('index.html');
    },
    'POST /crawl': async (ctx, next) => {
        let word = ctx.request.body.word || '',
            device = ctx.request.body.device || '';
        if(word !== ''){
            let imgArr = [];
            let crawlData = JSON.parse(await crawler (word,device));
            crawlData.dataList.forEach((data) => {
                if(data.pic !== ''){
                    imgArr.push(getImg(data.pic));
                    data.imgSrc = 'img/' + data.pic.replace(/[:/.]/g, '') + '.jpg';
                }
                else{
                    data.imgSrc = '';
                }
            });
            await Promise.all(imgArr);

            let newCrawlerData = new crawlerData(crawlData);

            newCrawlerData.save( (err)=> {
                if (err) return console.error(err);
            });

            await ctx.app.use(require('koa-static')('./static'));
            await ctx.render('crawler.html',{ word: word, device: device, dataList: crawlData.dataList});
        }
        else {
            ctx.response.body = '<h1>关键字不能为空！<h1>';
        }

    }
};


