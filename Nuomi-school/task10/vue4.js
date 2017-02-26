function Vue (obj) {
	this.el = obj.el;
	this.data = obj.data;
	const _init = document.querySelector(this.el).innerHTML;
	this.getInit = function(){
		return _init;
	}
	this.set();
};

Vue.prototype.set = function(){
	var container = document.querySelector(this.el);
	container.innerHTML = this.getInit();
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
      name: 'youngwind',
      age: 25
    },
    school: 'bupt',
    major: 'computer'
  }
});

let appWatch = new Observer(app);