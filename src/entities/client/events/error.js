const { Events } = require("discord.js")

module.exports ={
    name: Events.ShardError,
    run: (client, err) => console.error(err.message)
}