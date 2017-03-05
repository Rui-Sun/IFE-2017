phantom.outputEncoding="gb2312";
var startTime = new Date();
var keyword = '百度前端技术学院';
var keywordURL = encodeURIComponent(keyword);
var searchURL = 'https://www.baidu.com/s?wd=' + keywordURL;
var page = require('webpage').create(),
    system = require('system');
if(system.args[1] === 'ipad'){
    page.settings.userAgent = 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
    page.viewportSize = { width: 768, height: 1028 };
    page.clipRect = { top: 0, left: 0, width: 768, height: 1028 };
}
else if(system.args[1] === 'iphone5'){
    page.settings.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
    page.viewportSize = { width: 320, height: 568 };
    page.clipRect = { top: 0, left: 0, width: 320, height: 568 };
}
else if(system.args[1] === 'iphone6'){  
    page.settings.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
    page.viewportSize = { width: 375, height: 667 };
    page.clipRect = { top: 0, left: 0, width: 375, height: 667 };
}
page.open(searchURL, function(status) {
    if (status !== 'success') {
        console.log(JSON.stringify({ 'code': 0,'msg': '抓取失败','err': '网页加载失败',}));
    } 
    else {
        if(system.args[1] === 'iphone5' || system.args[1] === 'iphone6'){
        var dataList = page.evaluate(function(){
                var dataList = $('#results .c-container:not(.c-recomm-wrap)').map(function(){
                var info = {};
                info.title = $(this).find('.c-title').text() || '';
                info.abstract = $(this).find('.c-abstract').text() || '';
                info.link = $(this).children('.c-blocka').attr('href') || '';
                info.pic = $(this).find('.c-img img').attr('src') || '';
                return info;
            }).toArray();
            return dataList;
        });
        }
        else{
        var dataList = page.evaluate(function(){
                var dataList = $('.c-container').map(function(){
                var info = {};
                info.title = $(this).find('.t').text() || '';
                info.abstract = $(this).find('.c-abstract').text() || '';
                info.link = $(this).find('.t > a').attr('href') || '';
                info.pic = $(this).find('.general_image_pic img').attr('src') || '';
                return info;
            }).toArray();
            return dataList;
        });
        }
    var searchResult = {
        code: 1,
        msg: '抓取成功',
        word: keyword,
        time: new Date() - startTime,
        dataList: dataList
    };
    console.log(JSON.stringify(searchResult,null,4));
    page.render('test.png');
    console.log(page.url);
    console.log(system.args[1]);
    phantom.exit();
    }
});
