const { SlashCommandBuilder } = require('discord.js');
const { loadImages } = require('../utils/loadImages');
const botSettings = require('../botSettings.json');
const { checkCooldown, setCooldown } = require('../utils/cooldowns');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('spidey')
		.setDescription('I want pictures of spideman!'),
	async execute(interaction) {
		const cooldown = await checkCooldown(interaction.guild.id, 'spidey');
		if(!cooldown) {
			interaction.reply('Command on cooldown. Try again later.'); 
			return false; 
		}
		await setCooldown(interaction.guild.id, 'spidey');				
		const spidey = await loadImages(botSettings.spideyDir);
		if(!botSettings.spidey) { 
			await interaction.reply({ content: 'spidey disabled', ephemeral: true });
			console.log('spidey disabled');
			return;
		}
		if(spidey.length < 1) { 
			await interaction.reply({ content: 'no spideys loaded', ephemeral: true });
			console.log('No spidey loaded'); 
			return;
		}
		let randomIndex = Math.floor(Math.random() * Math.floor(spidey.length));		
		console.log(`${interaction.user.username} requested a spidey.\nPosting ${botSettings.spideyDir}${spidey[randomIndex]}.`);  
		await interaction.reply({ 
			files: [{
				attachment: botSettings.spideyDir + '/' + spidey[randomIndex],
				name: spidey[randomIndex]
				}]
			});
	},
};
