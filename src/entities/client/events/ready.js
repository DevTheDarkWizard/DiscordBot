const { Events } = require("discord.js")

module.exports = {
    name: Events.ClientReady,
	once: true,
    run: (client) => {
        console.log(`Bot logged in as \`${client.user.tag}\`, user ID: \`${client.user.id}\``);
    }
}