//垂直居中
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
let getting = setInterval(change,1000);


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

//闭包管理歌曲序号
const serialNum = (() => {
    let i = 0;
    function add(){
        if(i < source.length - 1){
        	i++;
    	}
        else{
        	i=0;
        }
    }
    function show(){
        return i
    }
    return {add: add, show: show};
})();

 //页面加载完成后加载第一首歌
 $(document).ready(function(){
 	$('#song-name').text(source[serialNum.show()].name);
 	$('#song-singer').text(source[serialNum.show()].singer);
 	$('#player-imgl,#player-imgs').css('background-image','url('+source[serialNum.show()].img+')');
 	$('#audio1').attr('src',source[serialNum.show()].url);
 });

 //切换歌曲按钮
 $('#player-next').click(function(){
 	serialNum.add();
 	$('#song-name').text(source[serialNum.show()].name);
 	$('#song-singer').text(source[serialNum.show()].singer);
 	$('#player-imgl,#player-imgs').css('background-image','url('+source[serialNum.show()].img+')');
 	$('#audio1').attr('src',source[serialNum.show()].url);
 	$('#player-play').trigger('click');
 });