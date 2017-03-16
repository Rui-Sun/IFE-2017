const Koa = require('koa');
const router = require('./routes');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser());

app.use(views(__dirname + '/views',{ map: {html: 'nunjucks' }}));

app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');