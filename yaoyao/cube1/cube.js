const cube = document.querySelector('#cube');
const order = document.querySelector('#order');
const submit = document.querySelector('#submit');

let direction = 0;
let cubeX = 120;
let cubeY = 120;

function turnLeft() {
    direction = (direction - 90) % 360; 
    cube.style.transform = 'rotate('+direction+'deg)';
}

function turnRight() {
    direction = (direction + 90) % 360; 
    cube.style.transform = 'rotate('+direction+'deg)';
}

function turnBack() {
    direction = (direction + 180) % 360; 
    cube.style.transform = 'rotate('+direction+'deg)';
}

function go() {
    switch(direction) {
        case 0:
            if((cubeY - 50) >= 70 && (cubeY - 50) <= 520){
                cubeY -= 50;
                cube.style.top = cubeY + 'px';
            }
            break;
        case 180:
        case -180:
            if((cubeY + 50) >= 70 && (cubeY + 50) <= 520){
                cubeY += 50;
                cube.style.top =  cubeY + 'px';
            }
            break;
        case 90:
        case -270:
            if((cubeX + 50) >= 70 && (cubeX + 50) <= 520){
                cubeX += 50;
                cube.style.left = cubeX + 'px';
            }
            break;
        case 270:
        case -90:
            if((cubeX - 50) >= 70 && (cubeX - 50) <= 520){
                cubeX -= 50;
                cube.style.left = cubeX + 'px';
            }
            break;
        default:
            alert('wrong!');
    }
}

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
        default:
    }
});