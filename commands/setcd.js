const { SlashCommandBuilder } = require('discord.js');
const { loadImages } = require('../utils/loadImages');
const botSettings = require('../botSettings.json');
const { checkCooldown, setCooldown } = require('../utils/cooldowns');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setcd')
		.setDescription('test command'),
	async execute(interaction) {
		// const frogs = await loadImages(botSettings.frogsDir);
		// if(!botSettings.pepo) { 
		// 	await interaction.reply({ content: 'pepos disabled', ephemeral: true });
		// 	console.log('pepos disabled');
		// 	return;
		// }
		try {
			// check cooldown
			// const cooldown = await checkCooldown(interaction.guild.id, 'testCD');
			// await interaction.reply(`Cooldown: ${cooldown}`);

			// set cooldown
			await setCooldown(interaction.guild.id, 'testCD');
			await interaction.reply(`Set cooldown.`);
		}		
		catch(error) {
			console.log(`Cooldown test error`);
			console.log(error);
		}
	},
};
