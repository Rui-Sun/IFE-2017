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
    div.className = 'tree-node';
    div.innerHTML = currentNode.data;
    div.setAttribute('selected', '0');      //设置selected属性来判断是否选中元素
    div.addEventListener('click', function(){divClicked(this);}, true);
    let childDiv = [];
    for(let i = 0, length = currentNode.children.length; i < length; i++){
        childDiv.push(createDiv(currentNode.children[i]));
    }
    childDiv.forEach(function(item){
        div.appendChild(item);
    });
    return div;
}

function divClicked(th) {                   //点击后设置选中状态与背景颜色
    let allNodes = document.querySelectorAll('.tree-node');
    allNodes.forEach(function(node){
        node.setAttribute('selected', '0');
        node.style.backgroundColor = 'white';
    });

    th.setAttribute('selected', '1');
    th.style.backgroundColor = 'red';
}

function deleteNode(tree) {                   //删除节点
    let allNodes = document.querySelectorAll('.tree-node');
    let detId = 0;
    allNodes.forEach(function(node){
        if(node.getAttribute('selected') === '1'){
            detId = node.id;                  //找到选中的节点的id
        }
    });
    let parentNode = {};
    let nodeIndex = 0;
    (function recurse(currentNode) {            //通过遍历找到选中节点的父节点以及选中节点在children数组的位置
        for(let i = 0, length = currentNode.children.length; i < length; i++){
            recurse(currentNode.children[i]);
        }
        if(currentNode.id == detId){
            parentNode = currentNode.parent;
            nodeIndex = 0;
            parentNode.children.forEach(function(node, index){
                if(node.id == detId){
                    nodeIndex = index;
                }
            })
        }
    })(tree._root);
    parentNode.children.splice(nodeIndex, 1);      //从数组中删除节点，并重新渲染
    document.getElementById('tree').innerHTML = '';
    document.getElementById('tree').appendChild(createDiv(tree._root));
}

function addNode(tree) {                          //添加节点
    let allNodes = document.querySelectorAll('.tree-node');
    let addId = 0;
    let addText = document.getElementById('add-text').value;
    allNodes.forEach(function(node){
        if(node.getAttribute('selected') === '1'){
            addId = node.id;                        //得到父节点的id
        }
    });
    let parentNode = {};
    (function recurse(currentNode) {                //遍历得到父节点
        for(let i = 0, length = currentNode.children.length; i < length; i++){
            recurse(currentNode.children[i]);
        }
        if(currentNode.id == addId){
            parentNode = currentNode;
        }
    })(tree._root);
    parentNode.addNode(idCounter, addText);         //添加节点后重新渲染

    document.getElementById('tree').innerHTML = '';
    document.getElementById('tree').appendChild(createDiv(tree._root));
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
    let searchData = document.getElementById('search-text').value;
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
    let searchData = document.getElementById('search-text').value;
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

document.getElementById('tree').appendChild(createDiv(school._root));

const buttonDLR = document.getElementById('start-DLR');
buttonDLR.onclick = function(){traverseDivDLR (school);};

const buttonLRD = document.getElementById('start-LRD');
buttonLRD.onclick = function(){traverseDivLRD (school);};

const searchButtonDLR = document.getElementById('search-DLR');
searchButtonDLR.onclick = function(){searchDLR (school);};

const searchButtonLRD = document.getElementById('search-LRD');
searchButtonLRD.onclick = function(){searchLRD (school);};

const deleteButton = document.getElementById('delete-node');
deleteButton.onclick = function(){deleteNode (school);};

const addButton = document.getElementById('add-node');
addButton.onclick = function(){addNode (school);};