const {Router} = require('express');
const SerialController = require('./src/Controllers/SerialController');
const ConfigController = require('./src/Controllers/ConfigController');
const router = Router();

router.get("/open",SerialController.connectPort);
router.get("/close",SerialController.disconnectPort);
router.get("/data",SerialController.getData);

//CONFIGURAÇÃO
router.put("/updateconfig",ConfigController.updateConfig);
router.get("/configinfo",ConfigController.showConfig);

module.exports = router;