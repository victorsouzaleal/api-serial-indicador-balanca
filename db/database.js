const nedb = require('nedb');
const configs = new nedb({filename: "./db/config.db", autoload:true});

module.exports = {
    async getLastConfig(){
        return new Promise((resolve,reject)=>{
            configs.findOne({type:'config'}, (err,doc)=>{
                resolve(doc);
            });
         })
    }, 
    async updateConfigData(port,equipament){
        return new Promise((resolve,reject)=>{
            configs.update({type: "config"} , {port, equipament,type:"config"},{}, (err) =>{
                if(err != null){
                    reject({
                        message : "Erro ao salvar configurações no banco de dados",
                        error: true
                    })
                } else {
                    configs.persistence.compactDatafile();
                    resolve({
                        message : "Configurações foram salvas com sucesso",
                        error: false
                    });
                }
            });
        })
    }
}