//歌曲信息
var source = [
{
	name : '长镜头',
	singer : '杨宗纬',
	img : 'http://npic7.edushi.com/cn/zixun/zh-chs/2016-10/02/3420126-20161002000857680.jpg',
	url : 'http://music.baidutt.com/up/kwcswdwd/mksdsu.mp3',
	like : true
},
{
	name : '拥抱',
	singer : '五月天',
	img : 'http://img5.duitang.com/uploads/item/201206/06/20120606200041_YJZ4n.jpeg',
	url : 'http://www.tingge123.com/mp3/2016-06-19/1466300596.mp3',
	like : false
},
{
	name : '依赖',
	singer : '张靓颖',
	img : 'http://www.hinews.cn/pic/003/012/543/00301254372_913162f8.jpg',
	url : 'http://music.baidutt.com/up/kwcswdwu/yyspdw.mp3',
	like : false
}]

//水平垂直居中
$("#player-main").css('margin-top',($(window).height()-$("#player-main").height())/2+'px');

//歌曲信息采集
 function change (){
 	let minNow = Math.floor($('#audio1').prop('currentTime')/60);
 	let secNow = Math.round($('#audio1').prop('currentTime')%60);
 	let minTot = Math.floor($('#audio1').prop('duration')/60);
 	if(isNaN(minTot)){
 		minTot = '0';
 	}
 	let secTot = Math.round($('#audio1').prop('duration')%60);
 	if(isNaN(secTot)){
 		secTot = '0';
 	}
 	if(secNow<10) {
 		secNow = '0' + secNow;
 	}
 	if(secTot<10) {
 		secTot = '0' + secTot;
 	}
 	$('#rest-time').text(minNow+":"+secNow+"/"+minTot+":"+secTot);
 	// $('#current-progress').width(parseInt($('#audio1').prop('currentTime'))/parseInt($('#audio1').prop('duration'))*100+'%');
 
  	$('#player-bar').slider('setValue',(parseInt($('#audio1').prop('currentTime'))/parseInt($('#audio1').prop('duration')))*100);
}
let dde = setInterval(change,1000);


//创建slider
 $('#volume-bar').slider({});
 $('#player-bar').slider({
 	tooltip: 'hide'
 });

 //播放、暂停按钮
 $('#player-play').click(function(){
 	let audio = document.querySelector('#audio1');
 	if(audio.paused){
 		audio.play();
 		$('#player-play .glyphicon').removeClass('glyphicon-play');
 		$('#player-play .glyphicon').addClass('glyphicon-pause');
 	}
 	else{
 		audio.pause();
 		$('#player-play .glyphicon').addClass('glyphicon-play');
 		$('#player-play .glyphicon').removeClass('glyphicon-pause');
 	}
 });

//音量滑动控制
 $('#volume-bar').on('change',function (){
 	$('#audio1').prop('volume',$('#volume-bar').slider('getValue')/100);
 	if($('#volume-bar').slider('getValue') == 0){
 		$('#player-volume .btn .glyphicon').removeClass('glyphicon-volume-up');
 		$('#player-volume .btn .glyphicon').addClass('glyphicon-volume-off');
 	}
 	else{
 		$('#player-volume .btn .glyphicon').addClass('glyphicon-volume-up');
 		$('#player-volume .btn .glyphicon').removeClass('glyphicon-volume-off');
 	}
 });

//静音按钮
$('#player-volume .btn').click(function(){
	let audio = document.querySelector('#audio1');
	if($('#volume-bar').slider('getValue') == 0){
		$('#volume-bar').slider('setValue',80);
		$('#volume-bar').trigger('change');
	}
	else{
		$('#volume-bar').slider('setValue',0);
		$('#volume-bar').trigger('change');
	}
})

//进度条滑动控制
 $('#player-bar').on('change',function (){
 	$('#audio1').prop('currentTime',$('#audio1').prop('duration')*$('#player-bar').slider('getValue')/100);
 });

var i = 0;//全局变量记录当前播放歌曲序号
 //页面加载完成后加载第一首歌
 $(document).ready(function(){
 	$('#song-name').text(source[i].name);
 	$('#song-singer').text(source[i].singer);
 	$('#player-imgl,#player-imgs').css('background-image','url('+source[i].img+')');
 	$('#audio1').attr('src',source[i].url);
 });
 //切换歌曲按钮
 $('#player-next').click(function(){
 	if((i+1)===source.length){
 		i = 0;
 	}
 	else{
 		i=i+1;
 	}
 	$('#song-name').text(source[i].name);
 	$('#song-singer').text(source[i].singer);
 	$('#player-imgl,#player-imgs').css('background-image','url('+source[i].img+')');
 	$('#audio1').attr('src',source[i].url);
 	$('#player-play').trigger('click');
 });