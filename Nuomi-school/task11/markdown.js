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
	//解析列表
	v = v.replace(/^(\s{0,3})[*+-]\s(.*)$/gm,function(match,group1,group2){
		let level = group1.length;
		return "!!"+level+"!!"+"<li>"+group2+"</li>";
	});

	v = v.replace(/(^\!\!\d+\!\!)(<li>.*<\/li>$)/gm,"$1<ul>$2");



	v = v.replace(/^\!\!(\d+)\!\!(<ul><li>.*<\/li>)(?=\n\!\!(\d+)\!\!<ul><li>.*<\/li>)/gm,function(match,group1,group2,group3){
		let now = parseInt(group1);
		let next = parseInt(group3);
		if(next === now){
			return group2+"</ul>";
		}
		else if(next < now){
			let add1 = now - next + 1;
			let newtext1 = group2;
			for(let i=0 ; i<add1 ; i++){
				newtext1 = newtext1 + "</ul>";
			}
			return newtext1;
		}
		else if(next > now){
			let add = next - now - 1;
			if(add === 0){
				return group2;
			}
			else{
				let newtext = group2;
				for(let i=0 ; i<add ; i++){
					newtext = newtext + "<ul></li>";
				}
				return newtext;
			}
		}
	});

	v = v.replace(/^\!\!\d+\!\!(<ul><li>.*<\/li>$)/gm,"$1</ul>");

	console.log(v);


	disp.innerHTML = v;
}
