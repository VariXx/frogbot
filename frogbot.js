const botSettings = require('./botSettings.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const { loadImages } = require('./utils/loadImages');
// https://discordapp.com/oauth2/authorize?client_id=697816077547339797&scope=bot&permissions=378944 

var frogs = [];
var spideys = [];
var alexJones = [];

function reloadImages() {
    frogs = loadImages(botSettings.frogsDir);
    spideys = loadImages(botSettings.spideysDir);
    alexJones = loadImages(botSettings.alexJonesDir);
}

client.once('ready', () => {
    reloadImages();
    if(botSettings !== undefined) {
        client.user.setActivity(botSettings.activity, {type: 'PLAYING'});
    }
	console.log(`${client.user.username} logged in.`);
});

client.on('message', message => {
    if(message.author.bot){ return; }
    checkmsg = message.content.toLowerCase();
    if(checkmsg == '!frog' || checkmsg == '!pepe' || checkmsg == '!frog' || checkmsg == '!pepo')
    {
        if(frogs.length < 1)
        {
            console.log('No frogs loaded.');
            return;
        }
        let randomIndex = Math.floor(Math.random() * Math.floor(frogs.length));
        console.log(`${message.author.username} requested a frog. Posting ${botSettings.frogsDir}${frogs[randomIndex]}.`);  
        message.channel.send({
            files: [{
              attachment: botSettings.frogsDir + '/' + frogs[randomIndex],
              name: frogs[randomIndex]
            }]
          })
            .then(console.log('Frog delivered'))
            .catch(console.error);
    }
    if(checkmsg == '!spidey' || checkmsg == '!spiderman' || checkmsg == 'i need pictures of spiderman!')
    {
        if(spideys.length < 1)
        {
            console.log('No spideys loaded.');
            return;
        }
        let randomIndex = Math.floor(Math.random() * Math.floor(spideys.length));
        console.log(`${message.author.username} requested a spidey. Posting ${botSettings.spideysDir}${spideys[randomIndex]}.`);  
        message.channel.send({
            files: [{
              attachment: botSettings.spideysDir + '/' + spideys[randomIndex],
              name: spideys[randomIndex]
            }]
          })
            .then(console.log('Spidey delivered'))
            .catch(console.error);
    }
    if(checkmsg == '!alexjones' || checkmsg == '!jones' || checkmsg == '!globalist')
    {
        if(alexJones.length < 1)
        {
            console.log('No alexJones loaded.');
            return;
        }
        let randomIndex = Math.floor(Math.random() * Math.floor(alexJones.length));
        console.log(`${message.author.username} requested Alex Jones. Posting ${botSettings.alexJonesDir}${alexJones[randomIndex]}.`);  
        message.channel.send({
            files: [{
              attachment: botSettings.alexJonesDir + '/' + alexJones[randomIndex],
              name: alexJones[randomIndex]
            }]
          })
            .then(console.log('Alex Jones delivered'))
            .catch(console.error);
    }
    if(checkmsg == '!froghelp' || checkmsg == '!help')
    {
        message.channel.send(`!frog sends a frog. !spidey sends a spidey. !froghelp displays this message`);
    }
    if(checkmsg == '!reloadimages')
    {
        if(message.channel.guild.available)
        {
            if(message.author.id == message.channel.guild.ownerID)
            {
                message.channel.send('Reloading images.');
                reloadImages();
                message.channel.send('Images reloaded.');
            }
        }
    }
});

client.login(botSettings.token);
