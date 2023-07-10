const { SlashCommandBuilder } = require('discord.js');
const { loadImages } = require('../utils/loadImages');
const botSettings = require('../botSettings.json');
const { checkCooldown, setCooldown } = require('../utils/cooldowns');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jones')
		.setDescription('Defeat the globalists'),
	async execute(interaction) {
		const cooldown = await checkCooldown(interaction.guild.id, 'jones');
		if(!cooldown) {
			interaction.reply('Command on cooldown. Try again later.'); 
			return false; 
		}
		await setCooldown(interaction.guild.id, 'jones');				
		const jones = await loadImages(botSettings.jonesDir);
		if(!botSettings.jones) { 
			await interaction.reply({ content: 'jones disabled', ephemeral: true });
			console.log('jones disabled');
			return;
		}
		if(jones.length < 1) { 
			await interaction.reply({ content: 'no jones loaded', ephemeral: true });
			console.log('No jones loaded'); 
			return;
		}
		let randomIndex = Math.floor(Math.random() * Math.floor(jones.length));		
		console.log(`${interaction.user.username} requested a jones.\nPosting ${botSettings.jonesDir}${jones[randomIndex]}.`);  
		await interaction.reply({ 
			files: [{
				attachment: botSettings.jonesDir + '/' + jones[randomIndex],
				name: jones[randomIndex]
				}]
			});
	},
};
