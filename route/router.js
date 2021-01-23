const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const alidevice = require("../controller/alidevice");

router.use(bodyParser.json());

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
});

router.use(bodyParser.json());

////////////////阿里设备管理////////////////
router.get('/alis', alidevice.alivfc);
router.get('/alis/:ProductKey', alidevice.aliFound);
router.post('/aliadd', alidevice.aliadd);
router.delete('/alidel/:ProductKey', alidevice.alidel);
router.put('/aliup', alidevice.aliup);

router.get('/devices/:ProductKey', alidevice.devFound);
router.post('/deviceadd', alidevice.devAdd);
router.post('/devdel', alidevice.devDel);
router.post('/devup', alidevice.devUp);

router.get('/light', alidevice.Flight);
router.get('/light1', alidevice.Flight1);
router.get('/light2', alidevice.Flight2);
router.get('/light3', alidevice.Flight3);
router.get('/fan', alidevice.Ffan);
router.get('/ac', alidevice.Fac);
router.get('/cw', alidevice.Fcw);
router.get('/ws/:id', alidevice.getws);


router.get('/pieData', alidevice.getpieData);

router.put('/alisetlight', alidevice.alisetlight);

module.exports = router;