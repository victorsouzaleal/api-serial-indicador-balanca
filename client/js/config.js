const backEl = document.querySelector("#back");
const menuConfigEl = document.querySelector("#menu-config");
const saveEl = document.querySelector("#save");
const mainDivEl = document.querySelector("#principal");
const configDivEl = document.querySelector("#config");
const selectPortEl = document.querySelector("#port-list");
const selectEquipEl = document.querySelector("#equip-list");

backEl.onclick = ()=>{
    mainDivEl.style.display = 'block';
    configDivEl.style.display = "none";
    cleanSelect(); 
}

menuConfigEl.onclick = ()=>{
    mainDivEl.style.display = 'none';
    configDivEl.style.display = "block";
    loadSelect(); 
}

saveEl.onclick = async ()=>{
    await saveConfig();
    await updateConfig();
}


async function loadSelect(){
    let {data:{portsAvailable, suportedEquipaments}}= await axios.get("http://localhost:3333/api/configinfo");
    portsAvailable.map(data =>{
        let option = document.createElement("option");
        option.value = data;
        option.innerHTML = data;
        selectPortEl.appendChild(option);
    })
    suportedEquipaments.map(data=>{
        let option = document.createElement("option");
        option.value = data;
        option.innerHTML = data;
        selectEquipEl.appendChild(option);
    })
    console.log(portsAvailable);
    console.log(suportedEquipaments);
}

async function saveConfig(){
    await axios.get("http://localhost:3333/api/close");
    let porta = selectPortEl.options[selectPortEl.selectedIndex].value;
    let equipamento = selectEquipEl.options[selectEquipEl.selectedIndex].value;
    let {data} = await axios.put("http://localhost:3333/api/updateconfig",{
        porta,
        equipamento
    })
    data = (data.error) ? data.error[0].message : data.message;
}

function cleanSelect(){
    selectPortEl.innerHTML = "";
    selectEquipEl.innerHTML = "";
}