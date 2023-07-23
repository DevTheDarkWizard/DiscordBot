const { REST, Routes } = require("discord.js")
const { readdirSync } = require("fs");
const path = require("path");
const ASCII = require("ascii-table");//Frufru

let table = new ASCII("Commands");//Frufru
table.setHeading("Command", "Load status");//Frufru

module.exports = async (client) => {
	let commandJsonList = []
    //Lê a pasta e subpasta do diretório "commands"
    readdirSync(path.resolve(__dirname,"../commands/")).forEach(dir => {
        //Para cada subpasta encontrada
        //Pegue todos os arquivos dessa pasta, filtrando aqueles que são da extensão .js e que não comecem com .
        const commands = readdirSync(path.resolve(__dirname,`../commands/${dir}/`)).filter(file => !file.startsWith(".") && file.endsWith(".js"));

        //Para cada arquivo encontrado faça
        for(let file of commands) {
             //Lê o arquivo
			let filePath = path.resolve(__dirname,`../commands/${dir}/${file}`)
            let command = require(filePath);
            
            //Caso o objeto retornado tenha a variável nome e tenha algo nela (é um comando válido)
            if("data" in command && "execute" in command) {
                //Adiciona na lista de comandos do cliente
                client.commands.set(command.data.name, command);

				//Adiciona na lista de comandos que vai mostrar para o usuário
				commandJsonList.push(command.data.toJSON());

                 //Caso tenha uma lista de apelidos no objeto.
                 //Adicione na lista de apelidos do cliente
                if(command.aliases && Array.isArray(command.aliases)) 
                    command.aliases.forEach(alias => client.aliases.set(alias, pull.data.name));

                table.addRow(file, "Ok".green);//Frufru
            } else {
				//console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);

                table.addRow(file, "Not a command".red);//Frufru
            }
        }
    });
    
    //Caso não encontre nenhum comando
    if(client.commands.map(c => c).length < 1) return console.error("No command found.".error);//Informe

    console.log(table.toString());//Frufru

	const rest = new REST().setToken(client.credentials.token);
	
	try {
		console.log(`Started refreshing ${commandJsonList.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
        //Efetivo para desenvolvimento de comandos em servidores de teste
		//const dataGuild = await rest.put(
		//	Routes.applicationGuildCommands(client.settings.clientId, client.settings.guildId),//Específica comandos para guilds individuais
		//	{ body: commandJsonList },
		//);

        const data = await rest.put(
			Routes.applicationCommands(client.settings.clientId), //Específica comandos para todas as guilds
			{ body: commandJsonList },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
}