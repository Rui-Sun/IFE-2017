
function Observer(vue){
	this.data = vue;
	this.handlers = {}; //事件处理方法
	this.queue = {};
	this.walk(this.data);
	var self = this;
	for(let prop in this.data){
		this.$watch(prop,function(){
			console.log(arguments);
			Vue.prototype.set.call(app);
		});
	}
}

let p = Observer.prototype;

//订阅事件
p.$watch = function(eventType,handler){
	if(typeof this.data[eventType] === "object"){
		search(this.queue[eventType],handler);
	}
	// else{
	// 	if(!(eventType in this.handlers)) {
	// 		this.handlers[eventType] = [];
	// 	}
	// 	this.handlers[eventType].push(handler);
	// }
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
		this.handlers[eventType][i].apply(window,handlerArgs);
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
					self.emit(key,val);                //发布事件
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


// let app1 = new Observer({
//   name: "sunrui",
//   age: 25
// });

// let app2 = new Observer({
//   university: "cugb",
//   major: "hydrogeology"
// });

// app1.$watch('age', function(age) {
//          console.log("我的年纪变了，现在已经是：" + age +"岁了");
//  });

// let app3 = new Observer({
//     name: {
//         firstName: 'rui',
//         lastName: 'sun'
//     },
//     age: 25
// });

// app3.$watch('name', function (newName) {
//     console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
// });