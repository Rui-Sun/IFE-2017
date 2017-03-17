const crawler = require('./crawler/crawler');
const crawlerData = require('./crawler/mongodb');

//下载imgPath内的图片，并存储到newPath
const getImg = function (imgPath, newPath) {
    let promise = new Promise(function (resolve, reject) {
        const fs = require("fs"); 
        if(imgPath.startsWith('http://')){          //判断图片来源为http还是https
            var http = require('http');
        }
        else if(imgPath.startsWith('https://')){
            var http = require('https');
        }
        http.get(imgPath, function(res){
            let imgData = "";
            res.setEncoding("binary"); 
            res.on("data", function(chunk){
                imgData+=chunk;                //接收图片
            });
            res.on("end", function(){           //存储图片
                fs.writeFile("./static/img/" + newPath + '.jpg', imgData, "binary", function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("img download success");
                    }
                    resolve();
                });
            });
        });
    });
    return promise;
}

//爬取指定关键词、指定页码、指定设备的信息，并保存在数据库当中，app加载img文件夹静态资源
async function crawl(task, app) {
    let imgArr = [];
    let randomName = 'abcdefhghijklmnoprstuvwxyz0123456789';            //准备生成随机字符串
    let crawlData = JSON.parse(await crawler(task.word, task.device, task.page));
    crawlData.dataList.forEach((data) => {
        if(data.pic !== ''){
            let newPath = '';
            for (i = 0; i < 36; i++) {
                newPath += randomName.charAt(Math.floor(Math.random() * 36));               //生成随机字符串
        　　}
            imgArr.push(getImg(data.pic, newPath));                 //同一次爬取所有图片均下载完毕后再继续进行
            data.imgSrc = 'img/' + newPath + '.jpg';                //imgSrc记录下载图片的位置
        }
        else{
            data.imgSrc = '';
        }
    });
    await Promise.all(imgArr);

    let newCrawlerData = new crawlerData(crawlData);                //爬取结果保存到数据库

    newCrawlerData.save( (err)=> {
        if (err) return console.error(err);
        console.log('saving success!');
    });

    await app.use(require('koa-static')('./static/img'));           //app加载图片静态资源
    return crawlData;                                               //返回爬取结果，以备页面渲染

}

module.exports = crawl;