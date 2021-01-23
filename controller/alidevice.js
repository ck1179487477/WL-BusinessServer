const Core = require('@alicloud/pop-core');
var mysql = require('mysql');

var client = new Core({
    accessKeyId: 'LTAI4FhPE6aE3TyptbT5Xiiw',
    accessKeySecret: 'Fe1HWClrpcN9bc3f3wbcVcfATSLhuU',
    endpoint: 'https://iot.cn-shanghai.aliyuncs.com',
    apiVersion: '2018-01-20'
});
var requestOption = {
    method: 'POST'
};
module.exports = {
    alivfc(req, res) {
        var params = {
            "RegionId": "cn-hangzhou",
            "CurrentPage": 1,
            "PageSize": 12
        }
        client.request('QueryProductList', params, requestOption).then((result) => {
            var a = JSON.parse(JSON.stringify(result));
            var b = a.Data;
            var c = b.List;
            var d = c.ProductInfo;
            res.send(d)
        }, (ex) => {
            console.log("qqq" + ex);
        })
        // console.log(d.Data.List.ProductInfo[0]);
        // console.log(d.Data.List.ProductInfo[0].ProductName);
    },

    aliFound(req, res) {
        var querystring = require('querystring');
        var result = querystring.parse(req.params.ProductKey, '&');
        let ProductKey = result.ProductKey;
        console.log("///////////////////////")
        console.log(result.ProductKey)
        console.log("///////////////////////")
        var params = {
            "RegionId": "cn-hangzhou",
            "ProductKey": ProductKey
        }
        client.request('QueryProduct', params, requestOption).then((result) => {
            var a = JSON.parse(JSON.stringify(result));
            var b = a.Data;
            const ProductKey = b.ProductKey;
            const ProductName = b.ProductName;
            const CategoryKey = b.CategoryKey;
            const CategoryName = b.CategoryName;
            console.log('----------------------------------------------')
            console.log(b)
            console.log('----------------------------------------------')
            res.send(JSON.stringify({ ProductKey: ProductKey, ProductName: ProductName, CategoryKey: CategoryKey, CategoryName: CategoryName }))

        }, (ex) => {
            console.log(ex);
        })
    },

    aliadd(req, res) {
        var ProductName = req.body.ProductName
        var params = {
            "RegionId": "cn-hangzhou",
            "NodeType": "0",
            "ProductName": ProductName,
            "DataFormat": "0",
        }
        client.request('CreateProduct', params, requestOption).then((result) => {
            console.log(JSON.stringify(result));
            res.send({ succ: true });
        }, (ex) => {
            console.log(ex);
        })
    },

    alidel(req, res) {
        var querystring = require('querystring');
        var result = querystring.parse(req.params.ProductKey, '&');
        let ProductKey = result.ProductKey;
        var params = {
            "RegionId": "cn-hangzhou",
            "ProductKey": ProductKey
        };
        client.request('DeleteProduct', params, requestOption).then((result) => {
            console.log(JSON.stringify(result));
            res.send({ succ: true });
        }, (ex) => {
            console.log(ex);
        })
    },

    aliup(req, res) {
        var ProductName = req.body.ProductName
        var ProductKey = req.body.ProductKey
        var params = {
            "RegionId": "cn-hangzhou",
            "ProductName": ProductName,
            "ProductKey": ProductKey
        }
        client.request('UpdateProduct', params, requestOption).then((result) => {
            console.log(JSON.stringify(result));
            res.send({ succ: true });
        }, (ex) => {
            console.log(ex);
        })
    },

    devFound(req, res) {
        var querystring = require('querystring');
        var result = querystring.parse(req.params.ProductKey);
        let ProductKey = result.ProductKey;

        var params = {
            "RegionId": "cn-hangzhou",
            "ProductKey": ProductKey
        }
        client.request('QueryDevice', params, requestOption).then((result) => {
            var a = JSON.parse(JSON.stringify(result));
            var b = a.Data;
            var c = b.DeviceInfo;
            res.send(c)
        }, (ex) => {
            console.log(ex);
        })

    },
    devAdd(req, res) {

        console.log(req.body)
        var ProductKey = req.body.ProductKey
        var Nickname = req.body.Nickname
        var DeviceName = req.body.DeviceName
        console.log(ProductKey);
        console.log(Nickname);
        var params = {
            "RegionId": "cn-hangzhou",
            "ProductKey": ProductKey,
            "Nickname": Nickname,
            "DeviceName": DeviceName
        };
        client.request('RegisterDevice', params, requestOption).then((result) => {
            console.log(JSON.stringify(result));
            res.send({ succ: true });
        }, (ex) => {
            console.log(ex);
        })
    },
    devDel(req, res) {
        console.log(req.body);
        var ProductKey = req.body.ProductKey
        var DeviceName = req.body.DeviceName
        var params = {
            "RegionId": "cn-hangzhou",
            "ProductKey": ProductKey,
            "DeviceName": DeviceName
        }

        client.request('DeleteDevice', params, requestOption).then((result) => {
            console.log(JSON.stringify(result));
            res.send({ succ: true });
        }, (ex) => {
            console.log(ex);
        })
    },
    devUp(req, res) {
        var ProductKey = req.body.ProductKey
        var DeviceName = req.body.DeviceName
        var Nickname = req.body.Nickname
        var params = {
            "RegionId": "cn-shanghai",
            "DeviceNicknameInfo.1.ProductKey": ProductKey,
            "DeviceNicknameInfo.1.DeviceName": DeviceName,
            "DeviceNicknameInfo.1.Nickname": Nickname
        }

        var requestOption = {
            method: 'POST'
        };

        client.request('BatchUpdateDeviceNickname', params, requestOption).then((result) => {
            console.log(JSON.stringify(result));
            res.send({ succ: true });
        }, (ex) => {
            console.log(ex);
        })
    },


    Flight1(req, res) {
        // console.log("取数据");
        // mysql记录
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'alipro'
        })
        connection.connect();
        connection.query('select * from light1 order by time desc limit 1', function (err, result) {
            if (err) {
                throw err;
            } else {
                var data = {
                    code: '200',
                    code_decoration: '查询成功'
                }
                // req.send({value:data, succ: true });
                // console.log('----------------------');
                // console.log(result);
                // console.log('----------------------');
                // console.log(data);
            }
            res.send(JSON.stringify(result));
        });
        connection.end();
    },

    Flight(req, res) {
        // console.log("取数据");
        // mysql记录
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'alipro'
        })
        connection.connect();
        connection.query('select * from light order by time desc limit 1', function (err, result) {
            if (err) {
                console.log(err);
            } else {
                var data = {
                    code: '200',
                    code_decoration: '查询成功'
                }
                // req.send({value:data, succ: true });
                // console.log('11111111111111111111111');
                // console.log(result);
                // console.log('11111111111111111111111');
                // console.log(data);
            }
            res.send(JSON.stringify(result));
        });
        connection.end();
    },
    Flight2(req, res) {
        // console.log("取数据");
        // mysql记录
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'alipro'
        })
        connection.connect();
        connection.query('select * from light2 order by time desc limit 1', function (err, result) {
            if (err) {
                console.log(err);
            } else {
                var data = {
                    code: '200',
                    code_decoration: '查询成功'
                }
                // req.send({value:data, succ: true });
                // console.log('----------------------');
                // console.log(result);
                // console.log('----------------------');
                // console.log(data);
            }
            res.send(JSON.stringify(result));
        });
        connection.end();
    },
    Flight3(req, res) {
        // console.log("取数据");
        // mysql记录
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'alipro'
        })
        connection.connect();
        connection.query('select * from light3 order by time desc limit 1', function (err, result) {
            if (err) {
                console.log(err);
            } else {
                var data = {
                    code: '200',
                    code_decoration: '查询成功'
                }
                // req.send({value:data, succ: true });
                // console.log('----------------------');
                // console.log(result);
                // console.log('----------------------');
                // console.log(data);
            }
            res.send(JSON.stringify(result));
        });
        connection.end();
    },
    Ffan(req, res) {
        // console.log("取数据");
        // mysql记录
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'alipro'
        })
        connection.connect();
        connection.query('select * from fan order by time desc limit 1', function (err, result) {
            if (err) {
                console.log(err);
            } else {
                var data = {
                    code: '200',
                    code_decoration: '查询成功'
                }
                // req.send({value:data, succ: true });
                // console.log('----------------------');
                // console.log(result);
                // console.log('----------------------');
                // console.log(data);
            }
            res.send(JSON.stringify(result));
        });
        connection.end();
    },
    Fac(req, res) {
        // console.log("取数据");
        // mysql记录
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'alipro'
        })
        connection.connect();
        connection.query('select * from ac order by time desc limit 1', function (err, result) {
            if (err) {
                console.log(err);
            } else {
                var data = {
                    code: '200',
                    code_decoration: '查询成功'
                }
                // req.send({value:data, succ: true });
                // console.log('----------------------');
                // console.log(result);
                // console.log('----------------------');
                // console.log(data);
            }
            res.send(JSON.stringify(result));
        });
        connection.end();
    },
    Fcw(req, res) {
        // console.log("取数据");
        // mysql记录
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'alipro'
        })
        connection.connect();
        connection.query('select * from cw order by time desc limit 1', function (err, result) {
            if (err) {
                console.log(err);
            } else {
                var data = {
                    code: '200',
                    code_decoration: '查询成功'
                }
                // req.send({value:data, succ: true });
                // console.log('----------------------');
                // console.log(result);
                // console.log('----------------------');
                // console.log(data);
            }
            res.send(JSON.stringify(result));
        });
        connection.end();
    },
    getws(req, resp) {
        // console.log("取数据");
        const id = req.params['id'];
        // mysql记录
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'aliwork'
        })
        connection.connect();
        connection.query('select * from co where id = ? order by time desc limit 10', [id], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                var data = {
                    code: '200',
                    code_decoration: '查询成功'
                }
                // req.send({value:data, succ: true });
                // console.log('cccccccccccccccccccc');
                // console.log(result);
                // console.log('cccccccccccccccccccc');
                // console.log(data);
            }
            const res = {
                id: id,
                data: result
            };
            resp.send(JSON.stringify(res));
        });
        connection.end();
    },

    getpieData(req, resp) {
        // mysql记录
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'alipro'
        })
        connection.connect();
        connection.query('select * from pieData', function (err, result) {
            if (err) {
                console.log(err);
            } else {
                var data = {
                    code: '200',
                    code_decoration: '查询成功'
                }
                // // req.send({value:data, succ: true });
                // console.log('----------------------');
                // console.log(result);
                // console.log('----------------------');
                // console.log(data);
            }
            const res = {
                data: result
            };
            resp.send(JSON.stringify(res));
        });
        connection.end();
    },

    alisetlight(req, res) {
        // console.log("0000000000000000000000000000000000");
        // console.log(req.body.status);
        // console.log("0000000000000000000000000000000000");
        var status = req.body.status
        var params = {
            "RegionId": "cn-hangzhou",
            "Items": "{\"LightStatus\":" + status + "}",
            "ProductKey": "a1kFFaZUC1C",
            "DeviceName": "LED713"
        }
        client.request('SetDeviceProperty', params, requestOption).then((result) => {
            console.log(JSON.stringify(result));
            res.send({ succ: true })
        }, (ex) => {
            console.log(ex);
        })
    }
}
// });