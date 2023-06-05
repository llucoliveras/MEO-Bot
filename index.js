const express = require('express')
const app = express()
const prefix = process.env.prefix
const { loadCommands, findCommand } = require('./commonFunctions')

const Discord = require("discord.js")
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]})

/** Open Server **/
app.listen(3000, () => {
	console.log("Server on!")
	loadCommands(client)
})

app.get("/", (req, res) => res.send("Server functioning!"))

client.on('ready', () => client.user.setActivity(`E-Sports`, { type: 'WATCHING' }))

/** Detect Message **/
client.on("messageCreate", message => {
	if(!message.content.startsWith(prefix) || message.author.bot) return

	const args = message.content.slice(prefix.length).split(/ +/)
	const command = args.shift().toLowerCase()

	findCommand(client, message, command, args)
})

client.login(process.env.token)