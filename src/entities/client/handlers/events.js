const { readdirSync } = require("fs");
const path = require("path");
const ASCII = require("ascii-table");//Frufru

let table = new ASCII("Events");//Frufru
table.setHeading("Event", "Load status");//Frufru

module.exports = async (client) => {
    //Lê a pasta dos eventos, filtrando aqueles que são da extensão .js e que não comecem com .
    const events = readdirSync(path.resolve(__dirname,"../events/")).filter(file => !file.startsWith(".") && file.endsWith(".js"));

    //Para cada arquivo encontrado faça
    for(let file of events) {
        //Lê o arquivo
        let event = require(path.resolve(__dirname,`../events/${file}`));

        //Caso o objeto retornado tenha a variável nome e tenha algo nela (é um evento válido)
        if(event.name) {
            //Adiciona nos eventos do cliente do discord
            if(event.once)
                client.once(event.name, event.run.bind(null, client));
            else
                client.on(event.name, event.run.bind(null, client));
            table.addRow(file, "Ok".green);//Frufru
        } else {
            table.addRow(file, "Not ok".red);//Frufru
        }
    }
    
    console.log(table.toString());//Frufru
}