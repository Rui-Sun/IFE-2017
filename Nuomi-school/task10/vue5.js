function Observer(vue){
	this.data = vue;
	this.handlers = {}; //事件处理方法
	this.queue = {};
	this.walk(this.data);
	var self = this;
	for(let prop in this.data){
		this.$watch(prop,function(){
			// console.log(arguments);
			Vue.prototype.set.call(app);    //订阅Vue对象实例中的所有属性，处理方法为调用Vue对象的set方法
		});
	}
}

let p = Observer.prototype;

//订阅事件
p.$watch = function(eventType,handler){
	if(typeof this.data[eventType] === "object"){
		search(this.queue[eventType],handler);
	}
	function search(childObj,handler){
		for(let prop in childObj.data){
			if(typeof prop === "object"){
				search(childObj.queue[prop],handler);
			}
			else{
				if(!(prop in childObj.handlers)){
					childObj.handlers[prop] = [];
				}
				childObj.handlers[prop].push(handler);
			}
		}
	}
}

//发布事件
p.emit = function(eventType){
	var handlerArgs = Array.prototype.slice.call(arguments,0);
	for(let i=0 ; i< this.handlers[eventType].length ; i++) {
		// this.handlers[eventType][i].apply(this,handlerArgs);
		this.handlers[eventType][i].apply(window,handlerArgs);     //在window中调用Vue的set方法
	}
};

p.walk = function(obj){
	let val;
	for(let key in obj){
		if(obj.hasOwnProperty(key)){
			val = obj[key];
		}
		if(typeof val === "object"){
			var child = new Observer(val);              //考虑对象属性值为对象
			this.queue[key] = child;
		}
		this.convert(key,val);
	}
};

p.convert = function(key,val){
	var self = this;
	Object.defineProperty(self.data,key,{
		enumerable: true,
		configurable: true,
		get: function(){
			// console.log("您访问了" + key);
			return val;
		},
		set: function(newVal){
			// console.log("您设置了" + key + "，" + "新的值为 " + newVal);
			if (newVal === val) return;
			val = newVal;
			for(let prop in self.handlers){
				if(prop === key){
					self.emit(key,val);                //发布事件，将属性名和最新值传回
				}
			}
			if(typeof newVal === "object"){                 //考虑属性值设置为对象
				// new Observer(newVal);
				var child = new Observer(newVal);              //考虑对象属性值为对象
				self.queue[key] = child;
			}
		}
	})
};

function Vue (obj) {
	this.el = obj.el;
	this.data = obj.data;
	const _init = document.querySelector(this.el).innerHTML;     //创建_init私有变量保存最初的DOM
	this.getInit = function(){
		return _init;
	}
	this.set();
};

Vue.prototype.set = function(){
	var container = document.querySelector(this.el);
	container.innerHTML = this.getInit();                          //每次调用DOM渲染前将DOM恢复到最初状态
	var bind = {};
	for(let key in this.data){
		for(let prop in this.data[key]){
			bind["{{"+key+"."+prop+"}}"] = this.data[key][prop];
		}
	}
	for(let i=0 ; i<container.children.length ; i++){
		for(let prop in bind){
			container.children[i].innerHTML = container.children[i].innerHTML.replace(prop,bind[prop]);
		}
	}
};



let app = new Vue({
  el: '#app',
  data: {
    user: {
      name: 'sunrui',
      age: 25
    },
    school: 'cugb',
    major: 'hydrogeologe'
  }
});

let appWatch = new Observer(app);