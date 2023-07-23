//Importa as bibliotecas
const { Client, Collection, GatewayIntentBits } = require("discord.js");

//Cria uma entidade do cliente do discord
const client = new Client({
	disableEveryone: true,//Desabilita de ser mencionado pelo o @everyone
	intents: [GatewayIntentBits.Guilds]
});

//Configurações das credenciais
client.credentials = {
    token: process.env["TOKEN"],
};

client.settings = {
	clientId: process.env["CLIENT_ID"],
	guildId: process.env["GUILD_ID"],
	deveopers: Object.freeze({
		chief: process.env["DEVELOPER_ID"], //ID do discord do desenvolvedor
		assistants: [] //Assistentes de desenvolvimento do bot, será adicionado posteriormente de outra forma
	})
}

//Cria um dicionário de ações e seus apelidos
client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();

//Adiciona os eventos e os comandos
["events", "commands"].forEach(async (handler) => await require(`./handlers/${handler}`)(client));

//Exporta a classe do cliente
module.exports = client;