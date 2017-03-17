const phantom = require('phantom');

module.exports = crawler;

//基于phantom的爬虫工具
async function crawler (word, device, pageNum){
    try{
        let startTime = new Date();
        let keywordURL = encodeURIComponent(word);
        let searchURL = 'https://www.baidu.com/s?wd=' + keywordURL + '&&pn=' + (pageNum-1) + '0';
        const instance = await phantom.create();
        const page = await instance.createPage();

        //判断设备类型
        if(device === 'ipad'){
            page.setting('userAgent','Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1');
            page.property('viewportSize',{ width: 768, height: 1028 });
            page.property('clipRect',{ top: 0, left: 0, width: 768, height: 1028 });
        }
        else if(device === 'iphone5'){
            page.setting('userAgent','Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1');
            page.property('viewportSize',{ width: 320, height: 568 });
            page.property('clipRect',{ top: 0, left: 0, width: 320, height: 568 });
            searchURL = 'https://m.baidu.com/s?wd=' + keywordURL + '&&pn=' + (pageNum-1) + '0';         //在iPhone中使用m.baidu.com保证页码正确
        }
        else if(device === 'iphone6'){  
            page.setting('userAgent','Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1');
            page.property('viewportSize',{ width: 375, height: 667 });
            page.property('clipRect',{ top: 0, left: 0, width: 375, height: 667 });
            searchURL = 'https://m.baidu.com/s?wd=' + keywordURL + '&&pn=' + (pageNum-1) + '0';
        }
        else if(device === 'pc'){
            
        }


        const status = await page.open(searchURL);
        if (status !== 'success') {
                return JSON.stringify({ code: 0, msg: '抓取失败', err: '网页加载失败',});
            }

        //对于iPhone和非iPhone设备，使用两种规则爬取信息
        let dataList = {};
        if(device === 'iphone5' || device === 'iphone6'){
            dataList = await page.evaluate(function(){
                var dataList1 = $('#results .c-container:not(.c-recomm-wrap)').map(function(){
                    var info = {};
                    info.title = ($(this).find('.c-title').text() || '').replace(/^\s+|\s+$|(?=\S)\s+|\s+(?=\S)/g,"");
                    info.abstract = ($(this).find('.c-abstract').text() || '').replace(/^\s+|\s+$|(?=\S)\s+|\s+(?=\S)/g,"");
                    info.link = ($(this).children('.c-blocka').attr('href') || '').replace(/^\s+|\s+$|(?=\S)\s+|\s+(?=\S)/g,"");
                    info.pic = ($(this).find('.c-img img').attr('src') || '').replace(/^\s+|\s+$|(?=\S)\s+|\s+(?=\S)/g,"");
                    return info;
                }).toArray();
                return dataList1;
            });
        }
        else{
            dataList = await page.evaluate(function(){
                var dataList1 = $('.c-container').map(function(){
                    var info = {};
                    info.title = ($(this).find('.t').text() || '').replace(/^\s+|\s+$|(?=\S)\s+|\s+(?=\S)/g,"");
                    info.abstract = ($(this).find('.c-abstract').text() || '').replace(/^\s+|\s+$|(?=\S)\s+|\s+(?=\S)/g,"");
                    info.link = ($(this).find('.t > a').attr('href') || '').replace(/^\s+|\s+$|(?=\S)\s+|\s+(?=\S)/g,"");
                    info.pic = ($(this).find('.general_image_pic img').attr('src') || '').replace(/^\s+|\s+$|(?=\S)\s+|\s+(?=\S)/g,"");
                    return info;
                }).toArray();
                return dataList1;
            });
        }

        let searchResult = {
            code: 1,
            msg: '抓取成功',
            word: word,
            device: device,
            time: new Date() - startTime,
            page: pageNum,
            dataList: dataList
        };

        await instance.exit();

        //传回JSON格式的爬取结果
        return JSON.stringify(searchResult,null,4);

        
    }catch (err) {
        return JSON.stringify({ code: 0, msg: '抓取失败', err: err.message });
    }
}