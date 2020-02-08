const serial = require('../../utils/serial');
const ConvertData = require('../../utils/ConvertData');
const suportedEquipaments = require('../../utils/SuportedEquipaments');
module.exports = {
    async connectPort(req,res){
        const {port} = req.query;
        serial.portConfig(port);    
        try{
            let response = await serial.openPort();
            res.json(response);
        } catch (err){
            res.json(err);
        }
    },
    async showAvailable(req,res){
        let ports = await serial.listPorts();
        let equipaments = suportedEquipaments;
        res.json({
            portsAvailable: ports,
            suportedEquipaments: equipaments
        })
    }, 
    async disconnectPort(req,res){
        try{
            let response = await serial.closePort();
            res.json(response)
        } catch (err){
            res.json(err);
        }
    },
    getData(req,res){
        const {equip} = req.query;
        let response = ConvertData(equip, serial.getSerialData(),serial.isOpened(),serial.isReceiving());
        res.json(response);
    }
}