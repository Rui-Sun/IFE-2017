function Observer(data){
	this.data = data;
	this.walk(data);
}

let p = Observer.prototype;

p.walk = function(obj){
	let val;
	for(let key in obj){
		if(obj.hasOwnProperty(key)){
			val = obj[key];
		}
		if(typeof val === "object"){
			new Observer(val);
		}
		this.convert(key,val);
	}
};

p.convert = function(key,val){
	Object.defineProperty(this.data,key,{
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