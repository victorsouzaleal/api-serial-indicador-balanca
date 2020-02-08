const serialport = require('serialport'), readline = require('@serialport/parser-readline');
var portConfigured,parser,portConnected = false,receivingData=false,serialData = "0";

module.exports = {
    portConfig(portToOpen){
        if(!portConnected){
            portConfigured = new serialport(portToOpen,{
                baudRate: 9600,
                autoOpen: false,
            });
            parser = portConfigured.pipe(new readline({delimiter: "\r\n"}));
            listenersPort();
        }
    },
    openPort(){
        return new Promise((resolve,reject) =>{
            if(!portConnected){
                portConfigured.open(err =>{
                    if(err){
                        reject({
                            status:{
                                messageText :`Erro ao abrir porta (${err.message})`,
                                portOpened : false,
                                error : true
                            }
                        });
                    }
                    setTimeout(()=>{
                        resolve({
                            status: {
                                messageText :`Porta aberta com sucesso`,
                                portOpened : true,
                                error : false
                            }
                        });
                    },500);
                })
            } else {
                reject({
                    status:{
                        messageText :`Já existe uma porta aberta, desconecte primeiro.`,
                        portOpened : false,
                        error : true
                    }
                });
            } 
        });
    },
    async listPorts(){
        try {
            var data = await serialport.list();
            data = data.map(data=>data.path);
        }catch (err){
            console.log(err);
        }
        return data;
    },
    closePort(){
        return new Promise((resolve,reject)=>{
            try{
                portConfigured.close();
                setTimeout(()=>{
                    serialData = "0";
                    resolve({
                        status: {
                            messageText :`Porta fechada com sucesso`,
                            portOpened : false,
                            error : false
                        }
                    });
                },500);
            }catch(err){
                reject({
                    status: {
                        messageText :`Porta já está fechada`,
                        portOpened : false,
                        error : true
                    }
                });
            }
        });
       
    },
    isOpened(){
        return portConnected;
    },
    isReceiving(){
        return receivingData;
    },
    getSerialData(){
        return serialData;
    }
}

function listenersPort(){
    portConfigured.on("open",()=>{
        portConnected = true;
        console.log("Nao recebendo dados");
        parser.on('data',(data)=>{
            receivingData = true;
            console.log("Recebendo dados");
            serialData = data;
        });
    })
    portConfigured.on('error', function(err) {
        console.log('Error: ', err.message)
    })
    portConfigured.on('close', function(err) {
        portConnected = false;
        portConfigured = "";
        console.log("Porta fechou");
    })
}