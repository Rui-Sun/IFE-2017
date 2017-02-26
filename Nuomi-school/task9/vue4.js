function Vue (obj) {
	this.el = obj.el;
	this.data = obj.data;
	this.set();
};

Vue.prototype.set = function(){
	var bind = {};
	var container = document.querySelector(this.el);
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
      name: "小明",
      age: 20
    }
  }
});

let app1 = new Vue({
	el: "#app1",
	data: {
		user: {
			city: "北京",
			occupation: "学生"
		}
	}
});