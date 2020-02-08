const {validationResult, check} = require('express-validator');
const serial = require('../../utils/serial');
const suportedEquipaments = require('../../utils/SuportedEquipaments');
const configdb = require('../../db/database');

module.exports = {
    async updateConfig(req,res){
        //SALVA CONFIGURAÇÃO DO EQUIPAMENTO E PORTA QUE SERÁ UTILIZADA
        await check("equipamento","Equipamento inválido ou não suportado").isIn(suportedEquipaments).run(req);
        await check("porta","Porta inválida ou não disponível").isIn(await serial.listPorts()).run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) { // SE HOUVER ERROR NA VALIDAÇÃO DOS DADOS
            let error = errors.array().map(error => {
                return {
                    message : error.msg,
                    error: true
                }
            })
            return res.json({error});
        } else { // SE OS DADOS ESTIVEREM CORRETOS
            try {
                let response = await configdb.updateConfigData(req.body.porta,req.body.equipamento);
                res.json(response);
            } catch(err){
                res.json(err);
            }
        };
    },
    async showConfig(req,res){
        let ports = await serial.listPorts();
        let equipaments = suportedEquipaments;
        let lastConfig = await configdb.getLastConfig();
        res.json({
            portsAvailable: ports,
            suportedEquipaments: equipaments,
            lastConfig
        })
    },
}
