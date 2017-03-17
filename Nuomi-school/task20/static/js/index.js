let socket = io();          //与服务器建立通信
let form = document.querySelector('#crawler-form');
let submit = document.querySelector('#submit');
let done = 0;               //全局变量记录已完成任务数
let total = 0;              //全局变量记录总任务数

//监听提交事件
submit.onclick = function () {
    let devicesList = form.elements['device'];
    let device = [];
    for(item of devicesList){
        if(item.checked){
            device.push(item.value);        //device数组记录所有设备名
            total += parseInt(form.elements['pages'].value);        //提交时记录总请求数
        }
    }
    document.querySelector('#total').innerHTML = total;
    if(form.elements['word'].value === ''){                         //判断：关键词不能为空
        alert('Key-word can not be empty!');
        return ;
    }
    else if(device.length === 0){                                   //判断：至少选择一个设备
        alert('Must select one device at least!');
        return ;
    }
    else if(!/^[1-9]\d*$/.test(form.elements['pages'].value)){       //判断：页码数格式正确
        alert('Must input the right type of number!');
        return ;
    }
    else{
        socket.emit('form submit', JSON.stringify({                 //提交表单信息
            word: form.elements['word'].value,
            device: device,
            pages: form.elements['pages'].value
        }));

    }
}

socket.on('crawl message', function(msg){                           //监听服务器爬取结果信息
    let result = JSON.parse(msg);
    const resultsTable = document.querySelector('#results');
    
    for(item of result.dataList){                                   //建立表格，并加入原表格
        let tableRow = document.createElement('tr');
        let word = document.createElement('td');
        word.innerHTML = result.word;
        tableRow.appendChild(word);
        let device = document.createElement('td');
        device.innerHTML = result.device;
        tableRow.appendChild(device);
        let page = document.createElement('td');
        page.innerHTML = result.page;
        tableRow.appendChild(page);
        let title = document.createElement('td');
        title.innerHTML = item.title;
        tableRow.appendChild(title);
        let abstract = document.createElement('td');
        abstract.innerHTML = item.abstract;
        tableRow.appendChild(abstract);
        let link = document.createElement('td');
        link.innerHTML = item.link;
        tableRow.appendChild(link);
        let pic = document.createElement('td');
        pic.innerHTML = `<img src=${item.imgSrc}>`;
        // pic.innerHTML = item.pic;
        tableRow.appendChild(pic);
        resultsTable.appendChild(tableRow);
    }
    done += 1;
    document.querySelector('#done').innerHTML = done;
});