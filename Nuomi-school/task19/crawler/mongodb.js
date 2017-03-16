const mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.connect('mongodb://127.0.0.1:27017/baidu');
const db = mongoose.connection;
db.on('error', function (e) {
  console.log('mongoose error' + e)
});
db.once('open', function () {
  console.log('mongoose connected!')
});

const crawlerSchema = mongoose.Schema({
    code: String ,
    msg: String ,
    word: String ,
    device: String,
    time: Number ,
    dataList: [{abstract: String, link: String, pic: String, title: String, imgSrc: String}]
});
const crawlerData = mongoose.model('crawlerData', crawlerSchema);

module.exports = crawlerData;