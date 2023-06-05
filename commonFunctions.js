const fs = require('fs')
const Discord = require("discord.js")

export const loadCommands = client => {
	client.commands = new Discord.Collection()

	const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
	for (const file of commandFiles){
		const command_file = require('./commands/'+file)
		client.commands.set(command_file.name, command_file)
	}
}

export const findCommand = (client, message, user_command, args) => {
	client.commands.map(command => {
		if (command.aliases.includes(user_command))
			console.log("FOUND " + command.name)
			return client.commands.get(command.name).execute(client, message, command, args)
	})
}