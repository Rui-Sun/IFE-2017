const inSchool = document.querySelector('#in-school');
const outSchool = document.querySelector('#out-school');

inSchool.addEventListener('click', () => {
    let show = document.querySelector('#in-school-row');
    let hide = document.querySelector('#out-school-row');
    show.removeAttribute('hidden');
    hide.setAttribute('hidden','hidden');
});
outSchool.addEventListener('click', () => {
    let show = document.querySelector('#out-school-row');
    let hide = document.querySelector('#in-school-row');
    show.removeAttribute('hidden');
    hide.setAttribute('hidden','hidden');
});

const bj = document.querySelector('#bj-sch');
const sh = document.querySelector('#sh-sch');
const js = document.querySelector('#js-sch');
const gd = document.querySelector('#gd-sch');
const city = document.querySelector('#city');
city.addEventListener('change', () => {
    let thisCity = city.value;
    let schools = document.getElementsByClassName('school');
    for(let school of schools){
        school.setAttribute('hidden','hidden');
    }
    switch(thisCity){
        case '北京': 
            bj.removeAttribute('hidden');
            break;
        case '上海': 
            sh.removeAttribute('hidden');
            break;
        case '江苏': 
            js.removeAttribute('hidden');
            break;
        case '广东': 
            gd.removeAttribute('hidden');
            break;
        default:
            alert('wrong!');
    }
});