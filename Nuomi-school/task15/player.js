$("#player-main").css('margin-top',($(window).height()-$("#player-main").height())/2+'px');

var source = [];

 function change (){
 	let minNow = Math.floor($('#audio1').prop('currentTime')/60);
 	let secNow = Math.round($('#audio1').prop('currentTime')%60);
 	let minTot = Math.floor($('#audio1').prop('duration')/60);
 	let secTot = Math.round($('#audio1').prop('duration')%60);
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

// $("#player-volume").mouseover(function(){
// 	$("#player-volume .progress").animate({
// 		width:'50px'
// 	},'1s');
// });
// $("#player-volume").mouseout(function(){
// 	$("#player-volume .progress").animate({
// 		width:'0'
// 	},'1s');
// });


 let dde = setInterval(change,500);

 $('#volume-bar').slider({});
 $('#player-bar').slider({});