module.exports = {
	name: "help",
	aliases: ["help", "h"],
	description: "Get general information about bot",
	execute(client, message, command, args){

		/** Get Commands Name & Description **/
		let commands_fields = [{
			name: '\u200b',
			value: '\u200b',
			inline: false,
		}]

		client.commands.map(command => {
			var field_name = ""

			command.aliases.map(name => {
				if(name != command.command_name) 
					field_name += `, ${name}`
			})

			commands_fields.push({
				name: field_name.slice(2),
				value: command.description
			})
		})

		/** Setup & Send Embed **/
		const exampleEmbed = {
			color: "GREEN",
			title: "Help Information",
			author: {
				name: message.author.username.toString(),
				icon_url: message.author.avatarURL()
			},
			description: 'Here you have some information on how to use this bot',
			thumbnail: {
				url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Info_icon_002.svg/2048px-Info_icon_002.svg.png"
			},
			fields: commands_fields,
			image: {
				url: 'https://i.imgur.com/AfFp7pu.png'
			},
			timestamp: new Date(),
			footer: {
				text: 'General Information',
				icon_url: client.user.avatarURL()
			}
		};

		message.channel.send({ embeds: [exampleEmbed] });
	}
}