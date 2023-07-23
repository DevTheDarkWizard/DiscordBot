const { Events } = require("discord.js")

module.exports = {
    name: Events.ShardDisconnect,
    run: (client, event) => {
        //TODO: Adicionar para verificar qual foi a situação
        console.log("Bot has been disconnected");
        process.exit(0);
    }
}