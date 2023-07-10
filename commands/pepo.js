const { SlashCommandBuilder } = require('discord.js');
const { loadImages } = require('../utils/loadImages');
const botSettings = require('../botSettings.json');
const { checkCooldown, setCooldown } = require('../utils/cooldowns');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pepo')
		.setDescription('A single pepo. Certified organic and gluten-free.'),
	async execute(interaction) {
		const cooldown = await checkCooldown(interaction.guild.id, 'pepo');
		if(!cooldown) {
			interaction.reply('Command on cooldown. Try again later.'); 
			return false; 
		}
		await setCooldown(interaction.guild.id, 'pepo');		
		const frogs = await loadImages(botSettings.frogsDir);
		if(!botSettings.pepo) { 
			await interaction.reply({ content: 'pepos disabled', ephemeral: true });
			console.log('pepos disabled');
			return;
		}
		if(frogs.length < 1) { 
			await interaction.reply({ content: 'no pepos loaded', ephemeral: true });
			console.log('No pepos loaded'); 
			return;
		}
		let randomIndex = Math.floor(Math.random() * Math.floor(frogs.length));		
		console.log(`${interaction.user.username} requested a pepo.\nPosting ${botSettings.frogsDir}${frogs[randomIndex]}.`);  
		await interaction.reply({ 
			files: [{
				attachment: botSettings.frogsDir + '/' + frogs[randomIndex],
				name: frogs[randomIndex]
				}]
			});
	},
};
