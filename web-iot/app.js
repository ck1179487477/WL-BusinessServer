const container = require('rhea');
const crypto = require('crypto');
var mysql = require('mysql');
//建立连接。
var dt = new Date;
var connection = container.connect({
    //接入域名，请参见AMQP客户端接入说明文档。
    'host': '1696068617512468.iot-amqp.cn-shanghai.aliyuncs.com',
    'port': 5671,
    'transport': 'tls',
    'reconnect': true,
    'idle_time_out': 60000,
    //userName组装方法，请参见AMQP客户端接入说明文档。其中的iotInstanceId， 购买的实例请填写实例ID，公共实例请填空字符串""。 

    'username': 'B4-69-21-52-72-B8|authMode=aksign,signMethod=hmacsha1,timestamp=' + dt.getTime() + ',authId=LTAI4FhPE6aE3TyptbT5Xiiw,iotInstanceId= ,consumerGroupId=DEFAULT_GROUP|',
    //计算签名，password组装方法，请参见AMQP客户端接入说明文档。 
    'password': hmacSha1('Fe1HWClrpcN9bc3f3wbcVcfATSLhuU', 'authId=LTAI4FhPE6aE3TyptbT5Xiiw&timestamp=' + dt.getTime() + ''),
});
//创建Receiver连接。
var receiver = connection.open_receiver();

//接收云端推送消息的回调函数。
// function getLight() {
container.on('message', function (context) {
    var msg = context.message;
    var messageId = msg.message_id;
    var topic = msg.application_properties.topic;
    var content = Buffer.from(msg.body.content).toString();

    console.log(topic);
    console.log("-----------------------");
    console.log(content);
    console.log("-----------------------");

    if (topic === '/a15pC2FCop2/light1/thing/event/property/post') {
        const resp = JSON.parse(content);
        console.log("###############");
        console.log(resp.items.LightStatus.value)
        console.log("###############");

        var status = Number(resp.items.LightStatus.value)

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'alipro'
        })
        connection.connect();
        console.log("连接成功")
        connection.query('insert into light(value,time) values(?,?)', [status, Date.now()], function (err, result) {
            if (err) {
                throw err;
            } else {
                var data = {
                    code: '200',
                    code_decoration: '添加成功'
                }
                // res.send({value:data, succ: true });
                console.log('----------------------');
                console.log(result);
                console.log('----------------------');
                console.log(data);
            }
        });
        connection.end();
    }

    if (topic === '/a1cPn7Gk1Ai/light2/thing/event/property/post') {
        const resp = JSON.parse(content);
        console.log("###############");
        console.log(resp.items.LightStatus.value)
        console.log("###############");

        var status = Number(resp.items.LightStatus.value)

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'alipro'
        })
        connection.connect();
        console.log("连接成功")
        connection.query('insert into light2(value,time) values(?,?)', [status, Date.now()], function (err, result) {
            if (err) {
                throw err;
            } else {
                var data = {
                    code: '200',
                    code_decoration: '添加成功'
                }
                // res.send({value:data, succ: true });
                console.log('----------------------');
                console.log(result);
                console.log('----------------------');
                console.log(data);
            }
        });
        connection.end();
    }

    if (topic === '/a1SFSLUHFOL/light3/thing/event/property/post') {
        const resp = JSON.parse(content);
        console.log("###############");
        console.log(resp.items.LightStatus.value)
        console.log("###############");

        var status = Number(resp.items.LightStatus.value)

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'alipro'
        })
        connection.connect();
        console.log("连接成功")
        connection.query('insert into light3(value,time) values(?,?)', [status, Date.now()], function (err, result) {
            if (err) {
                throw err;
            } else {
                var data = {
                    code: '200',
                    code_decoration: '添加成功'
                }
                // res.send({value:data, succ: true });
                console.log('----------------------');
                console.log(result);
                console.log('----------------------');
                console.log(data);
            }
        });
        connection.end();
    }

    if (topic === '/a1A3Wr9V1hf/smoke/thing/event/property/post') {
        const resp = JSON.parse(content);
        console.log(content);
        console.log("2222222222222222222222");
        console.log(resp.items.SmokeState.value)
        console.log("2222222222222222222222");

        var status = Number(resp.items.SmokeState.value)

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'alipro'
        })
        connection.connect();
        console.log("连接成功")
        connection.query('insert into ac(value,time) values(?,?)', [status, Date.now()], function (err, result) {
            if (err) {
                throw err;
            } else {
                var data = {
                    code: '200',
                    code_decoration: '添加成功'
                }
                // res.send({value:data, succ: true });
                console.log('----------------------');
                console.log(result);
                console.log('----------------------');
                console.log(data);
            }
        });
        connection.end();
    }

    if (topic === '/a1Fm3loARNS/fan1/thing/event/property/post') {
        const resp = JSON.parse(content);
        console.log("###############");
        console.log(resp.items.PowerSwitch.value)
        console.log("###############");

        var status = Number(resp.items.PowerSwitch.value)

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'alipro'
        })
        connection.connect();
        console.log("连接成功")
        connection.query('insert into fan(value,time) values(?,?)', [status, Date.now()], function (err, result) {
            if (err) {
                throw err;
            } else {
                var data = {
                    code: '200',
                    code_decoration: '添加成功'
                }
                // res.send({value:data, succ: true });
                console.log('----------------------');
                console.log(result);
                console.log('----------------------');
                console.log(data);
            }
        });
        connection.end();
    }

    if (topic === '/a1irosGderw/lastcw/thing/event/property/post') {
        const resp = JSON.parse(content);
        console.log("3333333333333333");
        console.log(resp.items.AnimalTemperature.value)
        console.log("3333333333333333");

        var status = Number(resp.items.AnimalTemperature.value)

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'alipro'
        })
        connection.connect();
        console.log("连接成功")
        connection.query('insert into cw(value,time) values(?,?)', [status, Date.now()], function (err, result) {
            if (err) {
                throw err;
            } else {
                var data = {
                    code: '200',
                    code_decoration: '添加成功'
                }
                // res.send({value:data, succ: true });
                console.log('----------------------');
                console.log(result);
                console.log('----------------------');
                console.log(data);
            }
        });
        connection.end();
        // ws.send2All(Number(resp.items.LightStatus.value));
        // devDao.receiveUpdate(Number(resp.items.LightStatus.value));
        // led.status = resp.items.LightStatus.value;
    }

    if (topic === '/a1kFFaZUC1C/LED713/thing/event/property/post') {
        const resp = JSON.parse(content);
        console.log("3333333333333333");
        console.log(resp.items.LightStatus.value)
        console.log("3333333333333333");

        var status = Number(resp.items.LightStatus.value)

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'alipro'
        })
        connection.connect();
        console.log("连接成功")
        connection.query('insert into light1(value,time) values(?,?)', [status, Date.now()], function (err, result) {
            if (err) {
                throw err;
            } else {
                var data = {
                    code: '200',
                    code_decoration: '添加成功'
                }
                // res.send({value:data, succ: true });
                console.log('----------------------');
                console.log(result);
                console.log('----------------------');
                console.log(data);
            }
        });
        connection.end();
        // ws.send2All(Number(resp.items.LightStatus.value));
        // devDao.receiveUpdate(Number(resp.items.LightStatus.value));
        // led.status = resp.items.LightStatus.value;
    }

    //发送ACK，注意不要在回调函数有耗时逻辑。 
    context.delivery.accept();
});

// }

//计算password签名。 
function hmacSha1(key, context) {
    return Buffer.from(crypto.createHmac('sha1', key).update(context).digest()).toString('base64');
}

// module.exports = {
//     getLight: getLight
// }

