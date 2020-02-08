    module.exports = function convertData(equipament,serialData,portConnected,receivingData){
        if(receivingData){
            let data;
            let equipamentSupported = false;
            //LOGICA DE CONVERSÃO
            switch(equipament){
                case "WT1000N":
                    data = convertWT1000N(serialData);
                    equipamentSupported = true;
                    break;
                default:{
                    equipamentSupported = false;
                }    
            }

            if(equipamentSupported){
                let [estavel,peso_bruto,tara,peso_liq,sobrecarga] = data.map(value => value);
                return {
                    data : {
                        estavel,
                        peso_bruto,
                        tara,
                        peso_liq,
                        sobrecarga
                    }, 
                    status :{
                        messageText: "Conexão funcionando corretamente",
                        portOpened : true,
                        error : false
                    }
                }
            } else {
                return {
                    status : {
                        messageText :`Equipamento não suportado para conversão`,
                        portOpened : true,
                        error : true
                    }
                } 
            }
            
        } else {
            if(portConnected){
                return {
                    status : {
                        messageText :`Conectado. Sem transmissão de dados`,
                        portOpened : true,
                        error : true
                    }
                } 
            } else {
                return {
                    status : {
                        messageText :`Sem conexão com a porta serial`,
                        portOpened : false,
                        error : true
                    }
                }
            }
        } 
    }


    function convertWT1000N(serialData){
        let sobrecarga = false;
        let [estavel, ...values] = serialData.split(",");
        let [peso_bruto, tara, peso_liq] = values.map(value =>{
            if(value.indexOf("OL") == -1){
                let teste = parseFloat(value);
                return teste.toString();
            }else {
                sobrecarga = true;
                return "0";
            }
        });
        estavel = (estavel == 0) ? true : false;
        return [estavel, peso_bruto,tara,peso_liq,sobrecarga];         
    } 
