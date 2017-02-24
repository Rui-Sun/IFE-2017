function createRightMenu(){
	var menu = document.createElement("div");
	menu.id = "right-menu";
	menu.style.width = "200px";
	menu.style.height = "100px";
	menu.style.backgroundColor = "#ccc";
	menu.style.position = "absolute";
	var opt1 = document.createElement("p");
	opt1.style.width = "180px";
	opt1.style.height = "50px";
	opt1.style.lineHeight = "50px";
	opt1.style.margin = "0";
	opt1.style.paddingLeft = "20px";
	opt1.innerHTML = "Menu Item 1";
	opt1.style.cursor = "default";
	opt1.onmouseover = function(){
		opt1.style.backgroundColor = "#bbb";
	};
	opt1.onmouseout = function(){
		opt1.style.backgroundColor = "transparent";
	};
	opt1.onclick = function(){
		alert("Menu Item 1");
	};
	menu.appendChild(opt1);
	var opt2 = document.createElement("p");
	opt2.style.width = "180px";
	opt2.style.height = "50px";
	opt2.style.lineHeight = "50px";
	opt2.style.margin = "0";
	opt2.style.paddingLeft = "20px";
	opt2.innerHTML = "Menu Item 2";
	opt2.style.cursor = "default";
	opt2.onmouseover = function(){
		opt2.style.backgroundColor = "#bbb";
	};
	opt2.onmouseout = function(){
		opt2.style.backgroundColor = "transparent";
	};
	opt2.onclick = function(){
		alert("Menu Item 2");
	};
	menu.appendChild(opt2);

	var region = document.getElementById("right-button-region");
	region.onmousedown = function(clickEvent){showMenu(clickEvent);}

	function showMenu(clickEvent) {
		if(clickEvent.button===2){
			document.oncontextmenu = function(clickEvent){
				clickEvent.preventDefault();
			}
		if(parseInt(clickEvent.clientX)+parseInt(menu.style.width) > 810){
			menu.style.left = (parseInt(clickEvent.clientX) - parseInt(menu.style.width))+"px";
		}else{
			menu.style.left = clickEvent.clientX+"px";
		}
		if(parseInt(clickEvent.clientY)+parseInt(menu.style.height) > 410){
			menu.style.top = (parseInt(clickEvent.clientY) - parseInt(menu.style.height))+"px";
		}else{
			menu.style.top = clickEvent.clientY+"px";
		}
			region.parentNode.appendChild(menu);
		}
		else if(clickEvent.button===0){
			if(document.getElementById("right-menu")){
				menu.parentNode.removeChild(menu);
			}
			
		}
	}
}

createRightMenu();