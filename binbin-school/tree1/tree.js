function Node(data) {       //节点对象
    this.data = data;
    this.parent = null;
    this.children = [];
}

function Tree(data) {       //树对象
    var node = new Node(data);
    this._root = node;
}

var tree = new Tree(1);     //创建树实例

tree._root.children.push(new Node(2));
tree._root.children.push(new Node(3));

tree._root.children[0].parent = tree;
tree._root.children[1].parent = tree;

tree._root.children[0].children.push(new Node(4));
tree._root.children[0].children.push(new Node(5));

tree._root.children[0].children[0].parent = tree._root.children[0];
tree._root.children[0].children[1].parent = tree._root.children[0];

tree._root.children[1].children.push(new Node(6));
tree._root.children[1].children.push(new Node(7));

tree._root.children[1].children[0].parent = tree._root.children[1];
tree._root.children[1].children[1].parent = tree._root.children[1];

tree._root.children[0].children[0].children.push(new Node(8));
tree._root.children[0].children[0].children.push(new Node(9));

tree._root.children[0].children[0].children[0].parent = tree._root.children[0].children[0];
tree._root.children[0].children[0].children[1].parent = tree._root.children[0].children[0];

tree._root.children[0].children[1].children.push(new Node(10));
tree._root.children[0].children[1].children.push(new Node(11));

tree._root.children[0].children[1].children[0].parent = tree._root.children[0].children[1];
tree._root.children[0].children[1].children[1].parent = tree._root.children[0].children[1];

tree._root.children[1].children[0].children.push(new Node(12));
tree._root.children[1].children[0].children.push(new Node(13));

tree._root.children[1].children[0].children[0].parent = tree._root.children[1].children[1];
tree._root.children[1].children[0].children[1].parent = tree._root.children[1].children[1];

tree._root.children[1].children[1].children.push(new Node(14));
tree._root.children[1].children[1].children.push(new Node(15));

tree._root.children[1].children[1].children[0].parent = tree._root.children[1].children[1];
tree._root.children[1].children[1].children[1].parent = tree._root.children[1].children[1];

function createDiv(currentNode) {           //根据数创建嵌套div
    let div = document.createElement('div');
    div.id = currentNode.data;
    let childDiv = [];
    for(let i = 0, length = currentNode.children.length; i < length; i++){
        childDiv.push(createDiv(currentNode.children[i]));
    }
    childDiv.forEach(function(item){
        div.appendChild(item);
    });
    return div;
}

function changeBackground(data) {           //改变背景颜色函数
    let div = document.getElementById(data);
    div.style.backgroundColor = 'blue';
}

function recoverBackground(data) {          //恢复背景颜色函数
    let div = document.getElementById(data);
    div.style.backgroundColor = 'white';
}


function traverseDivDLR (tree) {            //前序遍历
    let timeDelay = 0;
    (function recurse(currentNode) {
        setTimeout(function(){changeBackground(currentNode.data);},timeDelay);
        setTimeout(function(){recoverBackground(currentNode.data);},timeDelay+500);
        timeDelay += 500;
        for(let i = 0, length = currentNode.children.length; i < length; i++){
            recurse(currentNode.children[i]);
        }
    })(tree._root);
};

function traverseDivLDR (tree) {            //中序遍历
    let timeDelay = 0;
    (function recurse(currentNode) {
        if(currentNode.children.length !== 0){
            recurse(currentNode.children[0]);
            setTimeout(function(){changeBackground(currentNode.data);},timeDelay);
            setTimeout(function(){recoverBackground(currentNode.data);},timeDelay+500);
            timeDelay += 500;
            recurse(currentNode.children[1]);
        }
        else{
            setTimeout(function(){changeBackground(currentNode.data);},timeDelay);
            setTimeout(function(){recoverBackground(currentNode.data);},timeDelay+500);
            timeDelay += 500;
        }
    })(tree._root);
};

function traverseDivLRD (tree) {            //后序遍历
    let timeDelay = 0;
    (function recurse(currentNode) {
        for(let i = 0, length = currentNode.children.length; i < length; i++){
            recurse(currentNode.children[i]);
        }
        setTimeout(function(){changeBackground(currentNode.data);},timeDelay);
        setTimeout(function(){recoverBackground(currentNode.data);},timeDelay+500);
        timeDelay += 500;
    })(tree._root);
};

document.body.appendChild(createDiv(tree._root));

const buttonDLR = document.getElementById('start-DLR');
buttonDLR.onclick = function(){traverseDivDLR (tree)};

const buttonLDR = document.getElementById('start-LDR');
buttonLDR.onclick = function(){traverseDivLDR (tree)};

const buttonLRD = document.getElementById('start-LRD');
buttonLRD.onclick = function(){traverseDivLRD (tree)};