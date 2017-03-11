const cube = document.querySelector('#cube');
const order = document.querySelector('#order');
const submit = document.querySelector('#submit');

let direction = 0;              //全局变量，记录当前方向
let cubeX = 120;                //全局变量，记录当前X
let cubeY = 120;                //全局变量，记录当前Y

//左转方法
function turnLeft() {
    direction = (direction + 360) % 360;
    for(let i = 0; i < 90 ; i++){
        setTimeout(() => {
            direction -= 1;
            cube.style.transform = 'rotate(' + direction + 'deg)';
        }, (11*i))
    }
}

//右转方法
function turnRight() {
    direction = (direction + 360) % 360;
    for(let i = 0; i < 90 ; i++){
        setTimeout(() => {
            direction += 1;
            cube.style.transform = 'rotate(' + direction + 'deg)';
        }, (11*i))
    }
    
}

//后转方法
function turnBack() {
    direction = (direction + 360) % 360;
    for(let i = 0; i < 180 ; i++){
        setTimeout(() => {
            direction += 1;
            cube.style.transform = 'rotate(' + direction + 'deg)';
        }, (5*i))
    }
    
}

//向后行动
function goBottom() {
    if((cubeY + 50) >= 70 && (cubeY + 50) <= 520){
        for(let i = 0; i < 50; i++){
            setTimeout(() => {
                cubeY += 1;
                cube.style.top = cubeY + 'px';
            }, 20*i)
        }
    }    
}

//向前行动
function goTop() {
   if((cubeY - 50) >= 70 && (cubeY - 50) <= 520){
        for(let i = 0; i < 50; i++){
            setTimeout(() => {
                cubeY -= 1;
                cube.style.top = cubeY + 'px';
            }, 20*i)
        }
    }
}

//向右行动
function goRight() {
    if((cubeX + 50) >= 70 && (cubeX + 50) <= 520){
        for(let i = 0; i < 50; i++){
            setTimeout(() => {
                cubeX += 1;
                cube.style.left = cubeX + 'px';
            }, 20*i)
        }
    }
}

//向左行动
function goLeft() {
    if((cubeX - 50) >= 70 && (cubeX - 50) <= 520){
        for(let i = 0; i < 50; i++){
            setTimeout(() => {
                cubeX -= 1;
                cube.style.left = cubeX + 'px';
            }, 20*i)
        }
    }
}

//行动方法
function go() {
    direction = (direction + 360) % 360;
    switch(direction) {
        case 0:
            goTop();
            break;
        case 180:
            goBottom();
            break;
        case 90:
            goRight();
            break;
        case 270:
            goLeft();
            break;
        default:
            alert('wrong!');
    }
}

//转向左行动
function toLeft() {
    direction = (direction + 360) % 360;
    let detaDeg = (270 - direction) / 50;
    let dir = direction;
    if((cubeX - 50) >= 70 && (cubeX - 50) <= 520){
        for(let i = 0; i < 50; i++){
            setTimeout(() => {
                cubeX -= 1;
                cube.style.left = cubeX + 'px';
                dir += detaDeg;
                cube.style.transform = 'rotate(' + dir + 'deg)';
            }, 20*i)
        }
    }
    else{
        for(let i = 0; i < 50; i++){
            setTimeout(() => {
                dir += detaDeg;
                cube.style.transform = 'rotate(' + dir + 'deg)';
            }, 20*i)
        }
    }
    direction = 270;
}

//转向右行动
function toRight() {
    direction = (direction + 360) % 360;
    let detaDeg = (90 - direction) / 50;
    let dir = direction;
    if((cubeX + 50) >= 70 && (cubeX + 50) <= 520){
        for(let i = 0; i < 50; i++){
            setTimeout(() => {
                cubeX += 1;
                cube.style.left = cubeX + 'px';
                dir += detaDeg;
                cube.style.transform = 'rotate(' + dir + 'deg)';
            }, 20*i)
        }
    }
    else{
        for(let i = 0; i < 50; i++){
            setTimeout(() => {
                dir += detaDeg;
                cube.style.transform = 'rotate(' + dir + 'deg)';
            }, 20*i)
        }
    }
    direction = 90;
}

//转向前行动
function toTop() {
    direction = (direction + 360) % 360;
    let detaDeg = (0 - direction) / 50;
    let dir = direction;
    if((cubeY - 50) >= 70 && (cubeY - 50) <= 520){
        for(let i = 0; i < 50; i++){
            setTimeout(() => {
                cubeY -= 1;
                cube.style.top = cubeY + 'px';
                dir += detaDeg;
                cube.style.transform = 'rotate(' + dir + 'deg)';
            }, 20*i)
        }
    }
    else{
        for(let i = 0; i < 50; i++){
            setTimeout(() => {
                dir += detaDeg;
                cube.style.transform = 'rotate(' + dir + 'deg)';
            }, 20*i)
        }
    }
    direction = 0;
}

//转向后行动
function toBottom() {
    direction = (direction + 360) % 360;
    let detaDeg = (180 - direction) / 50;
    let dir = direction;
    if((cubeY + 50) >= 70 && (cubeY + 50) <= 520){
        for(let i = 0; i < 50; i++){
            setTimeout(() => {
                cubeY += 1;
                cube.style.top = cubeY + 'px';
                dir += detaDeg;
                cube.style.transform = 'rotate(' + dir + 'deg)';
            }, 20*i)
        }
    }
    else{
        for(let i = 0; i < 50; i++){
            setTimeout(() => {
                dir += detaDeg;
                cube.style.transform = 'rotate(' + dir + 'deg)';
            }, 20*i)
        }
    }
    direction = 180;
}

//监听提交按钮
submit.addEventListener('click', () => {
    let orderText = order.value;
    switch(orderText){
        case 'GO':
            go();
            break;
        case 'TUN LEF':
            turnLeft();
            break;
        case 'TUN RIG':
            turnRight();
            break;
        case 'TUN BAC':
            turnBack();
            break;
        case 'TRA LEF':
            goLeft();
            break;
        case 'TRA TOP':
            goTop();
            break;
        case 'TRA RIG':
            goRight();
            break;
        case 'TRA BOT':
            goBottom();
            break;
        case 'MOV LEF':
            toLeft();
            break;
        case 'MOV TOP':
            toTop();
            break;
        case 'MOV RIG':
            toRight();
            break;
        case 'MOV BOT':
            toBottom();
            break;
        default:
    }
});