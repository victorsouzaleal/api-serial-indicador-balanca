const pbElement = document.querySelector("#pb");
const taraElement = document.querySelector("#tara");
const plElement = document.querySelector("#pl");
const msgSerialEl = document.querySelector("#msgserial");
const connectEl = document.querySelector("#connect");
const disconnectEl = document.querySelector("#disconnect");
const estabilidadeEl = document.querySelector("#estabilidade");
var getDataInterval,config;

start();

async function start(){
    disconnectEl.disabled = true;
    connectEl.disabled = false;
    await updateConfig();
    await obterDadosAPI(); 
    getDataInterval = setInterval(obterDadosAPI,500)
}

connectEl.onclick = async ()=>{
    let response = await axios.get(`http://localhost:3333/api/open?port=${config.port}`);
    disconnectEl.disabled =  response.data.status.error;
    connectEl.disabled = !response.data.status.error;
}

disconnectEl.onclick = async ()=>{
    let response = await axios.get("http://localhost:3333/api/close");
    disconnectEl.disabled =  !response.data.status.error;
    connectEl.disabled = response.data.status.error;
}

async function obterDadosAPI(){
        let response = await axios.get(`http://localhost:3333/api/data?equip=${config.equipament}`);
        if(response.data.status.error){
            messageSerial(response.data.status.messageText, "red");
            portOpened(response.data.status.portOpened);
        } else {
            pbElement.innerHTML = response.data.data.peso_bruto;
            taraElement.innerHTML = response.data.data.tara;
            plElement.innerHTML = response.data.data.peso_liq;
            estabilidadeEl.innerHTML = (response.data.data.estavel) ? "Estável" : "Oscilando";
            if(response.data.data.sobrecarga){
                estabilidadeEl.innerHTML = "Sobrecarga";
            }
            messageSerial(response.data.status.messageText, "green");
            portOpened(response.data.status.portOpened);
        }
}
    

function portOpened(statusPort){
    disconnectEl.disabled = !statusPort;
    connectEl.disabled = statusPort;
}

function messageSerial(message,color = "blue"){
    msgSerialEl.style.color = color;
    msgSerialEl.innerHTML = message;
}

async function updateConfig(){
    let {data:{lastConfig : {port,equipament}}}= await axios.get("http://localhost:3333/api/configinfo");
    config = {port,equipament};
    console.log(config); 
}
