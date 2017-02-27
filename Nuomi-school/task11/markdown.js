function init(){
	let content = document.getElementById("content");
	content.style.height = (document.documentElement.clientHeight - 200)+"px";
	let sbt = document.getElementById("submit");
	sbt.onclick = function(){show();};
}

init();

function show(){
	let text = document.getElementById("text").value;
	let disp = document.getElementById("output");
	let u = text;
	let v = "";
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
	v = v.replace(/((^>(.|\n)+?(?=^$))|(^>(.|\n)+))/gm,function(match,group1){
		let origin1 = match;			
		let maxLength = 0;                   
		origin1 = origin1.replace(/(^(>+)\s*([^>]+)(?=>))|(^(>+)\s*(.|\n)+)/gm,function(smatch,sgroup1){
			var origin2 = smatch;
			origin2 = origin2.replace(/^(>+)\s*((.|\n)+)/,function(ssmatch,ssgroup1,ssgroup2){
				let length = ssgroup1.length;
				let origin3 = ssgroup2;
				if(length > maxLength){
					for(let i=0 ; i<(length-maxLength) ; i++){
						origin3 = "<div class=\"blockquote\">" + origin3;
					}
					maxLength = length;
				}
					return origin3;
			});
			return origin2;
		});
		for(let i=0 ; i<maxLength; i++){
			origin1 = origin1 + "</div>";

		}
		return origin1;

	});

	//解析行内代码
	v = v.replace(/`([^`]+)(?!^.*)`/gm,"<code>$1</code>");

	//解析块级代码
		//`...`情况
	v = v.replace(/^```$([^(```)]+)^```$/gm,"<pre><code>$1</code></pre>");
		//空格情况
	v = v.replace(/(^\s{4}(.+)$\n)+(?!^(\s{4}))/gm,function(match){
		let origin = match;
		origin = origin.replace(/^\s{4}/gm,"");
		origin = "<pre><code>"+origin+"</code></pre>";
		return origin;
	})
	// console.log(v);

	disp.innerHTML = v;
}
