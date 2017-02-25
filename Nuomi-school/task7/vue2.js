function Observer(data){
	this.data = data;
	this.walk(data);
	this.handlers = {}; //事件处理方法
}

let p = Observer.prototype;

//订阅事件
p.$watch = function(eventType,handler){
	if(!(eventType in this.handlers)) {
		this.handlers[eventType] = [];
	}
	this.handlers[eventType].push(handler);
}

//发布事件
p.emit = function(eventType){
	var handlerArgs = Array.prototype.slice.call(arguments,1);
	for(let i=0 ; i< this.handlers[eventType].length ; i++) {
		this.handlers[eventType][i].apply(this,handlerArgs);
	}
};

p.walk = function(obj){
	let val;
	for(let key in obj){
		if(obj.hasOwnProperty(key)){
			val = obj[key];
		}
		if(typeof val === "object"){
			new Observer(val);              //考虑对象属性值为对象
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
			console.log("您访问了" + key);
			return val;
		},
		set: function(newVal){
			console.log("您设置了" + key + "，" + "新的值为 " + newVal);
			if (newVal === val) return;
			val = newVal;
			self.emit(key,val);               //发布事件
			if(typeof newVal === "object"){   //考虑属性值设置为对象
				new Observer(newVal);
			}
		}
	})
};


let app1 = new Observer({
  name: "sunrui",
  age: 25
});

let app2 = new Observer({
  university: "cugb",
  major: "hydrogeology"
});

app1.$watch('age', function(age) {
         console.log("我的年纪变了，现在已经是：" + age +"岁了");
 });