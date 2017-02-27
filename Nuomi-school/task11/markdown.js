var content = document.getElementById("content");
content.style.height = (document.documentElement.clientHeight - 200)+"px";

var sbt = document.getElementById("submit");
sbt.onclick = function(){show();};



function show(){
	var text = document.getElementById("text").value;
	var disp = document.getElementById("output");
	var u = text;
	var v = "";
	//解析标题
	v = u.replace(/^(#{1,6})\s(.+?)\s*#*\s*$/gm,function(match,group1,group2){
		let level = group1.length;
		return "<h"+level+">"+group2+"</h"+level+">";
	});

	//解析无序列表
	v = v.replace(/^(\s{0,3})[*+-]\s(.*)$(?=\n^(\s{0,3})[*+-]\s.*$)/gm,function(match,group1,group2,group3){
		let levelNow = group1.length;
		let levelNext = group3.length;
		if(levelNow === levelNext){
			return "<ul><li>"+group2+"</li></ul>";
		}
		else if(levelNext < levelNow){
			let add = levelNow - levelNext + 1;
			let newtext = "<ul><li>"+group2+"</li>";
			for(let i=0 ; i<add ; i++){
				newtext = newtext + "</ul>";
			}
			return newtext;
		}
		else if(levelNext > levelNow){
			let add = levelNext - levelNow - 1;
			if(add === 0){
				return "<ul><li>"+group2+"</li>";
			}
			else{
				let newtext = "<ul><li>"+group2+"</li>";
				for(let i=0 ; i<add ; i++){
					newtext = newtext + "<ul></li>";
				}
				return newtext;
			}
		}
	});
	v = v.replace(/^\s{0,3}[*+-]\s(.*)$/gm,"<ul><li>$1</li></ul>");

	//解析有序列表
	v = v.replace(/^(\s{0,3})(\d)+[\.\)]\s(.*)$(?=\n^(\s{0,3})\d+[\.\)]\s.*$)/gm,function(match,group1,group2,group3,group4){
		let levelNow = group1.length;
		let levelNext = group4.length;
		if(levelNow === levelNext){
			return "<ol><li value=\""+group2+"\">"+group3+"</li></ol>";
		}
		else if(levelNext < levelNow){
			let add = levelNow - levelNext + 1;
			let newtext = "<ol><li value=\""+group2+"\">"+group3+"</li>";
			for(let i=0 ; i<add ; i++){
				newtext = newtext + "</ol>";
			}
			return newtext;
		}
		else if(levelNext > levelNow){
			let add = levelNext - levelNow - 1;
			if(add === 0){
				return "<ol><li value=\""+group2+"\">"+group3+"</li>";
			}
			else{
				let newtext = "<ol><li value=\""+group2+"\">"+group3+"</li>";
				for(let i=0 ; i<add ; i++){
					newtext = newtext + "<ol></li>";
				}
				return newtext;
			}
		}
	});
	v = v.replace(/^\s{0,3}(\d)+[\.\)]\s(.*)$/gm,"<ol><li value=\"$1\">$2</li></ol>");

	//解析引用
	v = v.replace(/^>+\s*(.*)(?=(^\r|\n\r|\n$)|(.\r|\n\r|\n.))/gm,"<div class=\"blockquote\">$1</div>");




	console.log(v);


	disp.innerHTML = v;
}
