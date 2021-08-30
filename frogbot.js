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

function processCommand(message) {
    let checkMsg = message.content.toLowerCase();
    if(checkMsg == '!frog' || checkMsg == '!pepe' || checkMsg == '!frog' || checkMsg == '!pepo'){
        if(!botSettings.pepo) { 
            console.log(`Frogs disabled.`);
            return;
        }        
        if(frogs.length < 1){
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
    if(checkMsg == '!spidey' || checkMsg == '!spiderman' || checkMsg == 'i need pictures of spiderman!') {
        if(!botSettings.spidey) { 
            console.log(`Spideys disabled.`);
            return;
        }
        if(spideys.length < 1) {
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
    if(checkMsg == '!alexjones' || checkMsg == '!jones' || checkMsg == '!globalist') {
        if(!botSettings.jones) { 
            console.log(`Alex Jones disabled.`);
            return;
        }        
        if(alexJones.length < 1){
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
    if(checkMsg == '!froghelp' || checkMsg == '!help') {
        message.channel.send(`!frog sends a frog. !spidey sends a spidey. !froghelp displays this message`);
    }
    if(checkMsg == '!reloadimages') {
        if(message.channel.guild.available) {
            // if(message.author.id == message.channel.guild.ownerID) {
            if(message.author.id == botSettings.botOwnerID) {
                message.channel.send('Reloading images.');
                reloadImages();
                message.channel.send('Images reloaded.');
            }
            else {
                console.log(`Reload images command came from non-owner (${message.author.username} (${message.author.id})) ignoring.`);
            }
        }
    }
    // if(checkMsg == '!test') {
    //     if(message.author.id == botSettings.botOwnerID) {
    //         console.log(message);
    //     }
    //     else { 
    //         console.log(`Test command came from non-owner, ignoring.`);
    //     }
    // }
}

client.on('message', message => {
    if(message.author.bot){ return; }
    processCommand(message);
});

client.login(botSettings.token);
