var startTime = new Date();
var keyword = '百度前端技术学院';
var searchURL = 'https://www.baidu.com/s?wd=' + keyword;
var page = require('webpage').create();
page.open(searchURL, function(status) {
    if (status !== 'success') {
        console.log(JSON.stringify({ 'code': 0,'msg': '抓取失败','err': '网页加载失败',}));
    } 
    else {
        var dataList = page.evaluate(function(){
            var dataList = $('#content_left .c-container').map(function(){
                var info = {};
                info.title = $(this).find('.t').text() || '';
                info.abstract = $(this).find('.c-abstract').text() || '';
                info.link = $(this).find('.t > a').attr('href') || '';
                info.pic = $(this).find('.general_image_pic img').attr('src') || '';
                return info;
            }).toArray();
            return dataList;
        });
    var searchResult = {
        code: 1,
        msg: '抓取成功',
        word: keyword,
        time: new Date() - startTime,
        dataList: dataList
    };
    phantom.outputEncoding="gb2312";
    console.log(JSON.stringify(searchResult,null,4));
    phantom.exit();
    }
});
