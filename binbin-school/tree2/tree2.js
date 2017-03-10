function Node(id, data) {       //节点对象
    this.id = id;
    this.data = data;
    this.parent = null;
    this.children = [];
}

function Tree(data) {       //树对象
    let node = new Node(0, data);
    this._root = node;
}

Node.prototype.addNode = function (id, data){
    let node = new Node(id, data);
    this.children.push(node);
    node.parent = this;
    idCounter += 1;
}

let school = new Tree('school');     //创建树实例
let idCounter = 1;                   //创建id计数器，保证一个节点和一个div相对应

school._root.addNode(idCounter,'business');
school._root.addNode(idCounter,'frontend');
school._root.addNode(idCounter,'nuomi');

school._root.children[0].addNode(idCounter,'react');
school._root.children[0].addNode(idCounter,'android');
school._root.children[0].addNode(idCounter,'ios');

school._root.children[1].addNode(idCounter,'echarts');
school._root.children[1].addNode(idCounter,'webgl');

school._root.children[2].addNode(idCounter,'node');
school._root.children[2].addNode(idCounter,'css3');
school._root.children[2].addNode(idCounter,'vue');

function createDiv(currentNode) {           //根据数创建嵌套div
    let div = document.createElement('div');
    div.id = currentNode.id;
    div.innerHTML = currentNode.data;
    let childDiv = [];
    for(let i = 0, length = currentNode.children.length; i < length; i++){
        childDiv.push(createDiv(currentNode.children[i]));
    }
    childDiv.forEach(function(item){
        div.appendChild(item);
    });
    return div;
}

function changeBackground(id) {           //改变背景颜色函数
    let div = document.getElementById(id);
    div.style.backgroundColor = 'blue';
}

function recoverBackground(id) {          //恢复背景颜色函数
    let div = document.getElementById(id);
    div.style.backgroundColor = 'white';
}


function traverseDivDLR (tree) {            //前序遍历
    let timeDelay = 0;
    (function recurse(currentNode) {
        setTimeout(function(){changeBackground(currentNode.id);},timeDelay);
        setTimeout(function(){recoverBackground(currentNode.id);},timeDelay+500);
        timeDelay += 500;
        for(let i = 0, length = currentNode.children.length; i < length; i++){
            
            recurse(currentNode.children[i]);
        }
    })(tree._root);
};

function traverseDivLRD (tree) {            //后序遍历
    let timeDelay = 0;
    (function recurse(currentNode) {
        for(let i = 0, length = currentNode.children.length; i < length; i++){
            recurse(currentNode.children[i]);
        }
        setTimeout(function(){changeBackground(currentNode.id);},timeDelay);
        setTimeout(function(){recoverBackground(currentNode.id);},timeDelay+500);
        timeDelay += 500;
    })(tree._root);
};

function searchDLR (tree) {                 //前序遍历查找
    let searchData = document.getElementById('search-text').value
    if(searchData === '') return;
    (function recurse(currentNode) {
        if(currentNode.data === searchData){
            changeBackground(currentNode.id);
        }else{
            recoverBackground(currentNode.id);
        }
        for(let i = 0, length = currentNode.children.length; i < length; i++){
            recurse(currentNode.children[i]);
        }
    })(tree._root);
}

function searchLRD (tree) {                 //后序遍历查找
    let searchData = document.getElementById('search-text').value
    if(searchData === '') return;
    (function recurse(currentNode) {
        for(let i = 0, length = currentNode.children.length; i < length; i++){
            recurse(currentNode.children[i]);
        }
        if(currentNode.data === searchData){
            changeBackground(currentNode.id);
        }else{
            recoverBackground(currentNode.id);
        }
    })(tree._root);
}

document.body.appendChild(createDiv(school._root));

const buttonDLR = document.getElementById('start-DLR');
buttonDLR.onclick = function(){traverseDivDLR (school)};

const buttonLRD = document.getElementById('start-LRD');
buttonLRD.onclick = function(){traverseDivLRD (school)};

const searchButtonDLR = document.getElementById('search-DLR');
searchButtonDLR.onclick = function(){searchDLR (school)};

const searchButtonLRD = document.getElementById('search-LRD');
searchButtonLRD.onclick = function(){searchLRD (school)};
