const form = document.querySelector('#myForm');
const inputText = document.querySelectorAll('#myForm .row input');
for(let inputBox of inputText){
    inputBox.addEventListener('focus', () => {
        inputBox.parentNode.nextElementSibling.removeAttribute('hidden');
    });
}
function nameVerify() {
    let name = document.querySelector('#name');
    let tip = document.querySelector('#name-tip');
    tip.removeAttribute('hidden');
    let length = 0;
    let judge1 = /[\x00-\xFF]/;
    let judge2 = /[\u4e00-\u9fa5]/;
    for(let str of name.value){
        if(judge1.test(str)){
            length += 1;
        }
        else if(judge2.test(str)){
            length += 2;
        }
    }
    if(length >= 4 && length <= 8){
        tip.innerHTML = '名称格式正确';
        tip.style.color = '#00CC66';
        name.style.borderColor = '#00CC66';
    }
    else if(length === 0){
        tip.innerHTML = '姓名不能为空';
        tip.style.color = '#990000';
        name.style.borderColor = '#990000';
    }
    else{
        tip.innerHTML = '长度必须在4~16之间';
        tip.style.color = '#990000';
        name.style.borderColor = '#990000';
    }
}

function passwordVerify() {
    let password = document.querySelector('#password');
    let tip = document.querySelector('#password-tip');
    tip.removeAttribute('hidden');
    let judge = /[a-zA-Z0-9]{6,12}/;
    if(judge.test(password.value)){
        tip.innerHTML = '密码格式正确';
        tip.style.color = '#00CC66';
        password.style.borderColor = '#00CC66';
    }
    else if(password.value.length === 0){
        tip.innerHTML = '密码不能为空';
        tip.style.color = '#990000';
        password.style.borderColor = '#990000';
    }
    else {
        tip.innerHTML = '密码必须由6~12个字母或数字组成';
        tip.style.color = '#990000';
        password.style.borderColor = '#990000';
    }
}

function passwordEnsureVerify() {
    let password = document.querySelector('#password');
    let passwordEnsure = document.querySelector('#password-ensure')
    let tip = document.querySelector('#password-ensure-tip');
    tip.removeAttribute('hidden');
    if(password.value === passwordEnsure.value){
        if(password.value.length === 0){
            tip.innerHTML = '密码不能为空';
            tip.style.color = '#990000';
            passwordEnsure.style.borderColor = '#990000';
        }
        else{
            tip.innerHTML = '密码一致';
            tip.style.color = '#00CC66';
            passwordEnsure.style.borderColor = '#00CC66';
        }
    }
    else{
        tip.innerHTML = '密码输入不一致';
        tip.style.color = '#990000';
        passwordEnsure.style.borderColor = '#990000';
    }
}

function emailVerify() {
    let email = document.querySelector('#email');
    let tip = document.querySelector('#email-tip');
    tip.removeAttribute('hidden');
    let judge = /^[\w_-]+@[\w_-]+(\.[\w_+]+)+$/;
    if(judge.test(email.value)){
        tip.innerHTML = '邮箱输入正确';
        tip.style.color = '#00CC66';
        email.style.borderColor = '#00CC66';
    }
    else{
        tip.innerHTML = '邮箱格式不正确';
        tip.style.color = '#990000';
        email.style.borderColor = '#990000';
    }
}

function phoneVerify() {
    let phone = document.querySelector('#phone');
    let tip = document.querySelector('#phone-tip');
    tip.removeAttribute('hidden');
    let judge = /^1[34578]\d{9}$/;
    if(judge.test(phone.value)){
        tip.innerHTML = '手机号码输入正确';
        tip.style.color = '#00CC66';
        phone.style.borderColor = '#00CC66';
    }
    else{
        tip.innerHTML = '手机号码格式不正确';
        tip.style.color = '#990000';
        phone.style.borderColor = '#990000';
    }
}
document.querySelector('#name').addEventListener('blur', () => {nameVerify();});
document.querySelector('#password').addEventListener('blur', () => {passwordVerify();});
document.querySelector('#password-ensure').addEventListener('blur', () => {passwordEnsureVerify();});
document.querySelector('#email').addEventListener('blur', () => {emailVerify();});
document.querySelector('#phone').addEventListener('blur', () => {phoneVerify();});
form.addEventListener('submit', (event) => {
    event.preventDefault();
    nameVerify();
    passwordVerify();
    passwordEnsureVerify();
    emailVerify();
    phoneVerify();
    let tips = document.querySelectorAll('.tip');
    console.log(tips);
    let submitStatus = true;
    for(let tip of tips){
        if(tip.style.color == 'rgb(153, 0, 0)'){
            submitStatus = false;
        }
    }
    if (submitStatus) {
        alert('提交成功');
    }
    else{
        alert('提交失败');
    }
});