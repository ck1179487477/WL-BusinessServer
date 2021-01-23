const express = require('express');
const app = express();
const logger = require("morgan");
const router = require('./route/router')
const bodyParser = require('body-parser');
// const amqp = require('./web-iot/app');

app.use(bodyParser.json());
app.use(router);

//app.use(amqp);
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded()); // 增加其他路由处理 
app.use(logger('dev'));

app.listen(3000, function () {
    console.log('服务器在3000端口启动!');
});