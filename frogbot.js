const botSettings = require('./botSettings.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const { loadImages } = require('./utils/loadImages');
const { getGuildSetting } = require('./utils/getGuildSettings');
const { setGuildSettings } = require('./utils/setGuildSettings');
// https://discordapp.com/oauth2/authorize?client_id=697816077547339797&scope=bot&permissions=378944 

var frogs = [];
var spideys = [];
var alexJones = [];

var enabledChannels = []; 

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

async function processCommand(message) {
    let checkMsg = message.content.split(" ");
    let command = checkMsg[0].toLowerCase();
    if(command == '!frog' || command == '!pepe' || command == '!frog' || command == '!pepo'){
        if(!botSettings.pepo) { 
            console.log(`Frogs disabled.`);
            return;
        }
        if(!enabledChannels.includes(message.channel)) {
            console.log(`Channel ${message.channel} not in enabled channels list`);
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
    if(command == '!spidey' || command == '!spiderman') {
        if(!botSettings.spidey) { 
            console.log(`Spideys disabled.`);
            return;
        }
        if(!enabledChannels.includes(message.channel)) {
            console.log(`Channel ${message.channel} not in enabled channels list`);
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
    if(command == '!alexjones' || command == '!jones' || command == '!globalist') {
        if(!botSettings.jones) { 
            console.log(`Alex Jones disabled.`);
            return;
        }
        if(!enabledChannels.includes(message.channel)) {
            console.log(`Channel ${message.channel} not in enabled channels list`);
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
    if(command == '!froghelp' || command == '!help') {
        message.channel.send(`!frog sends a frog. !spidey sends a spidey. !froghelp displays this message`);
    }
    if(command == '!reloadimages') {
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
    if(command == '!frogstatus') {
        if(message.channel.guild.available) {
            if(message.author.id == botSettings.botOwnerID) {
                let activityString = '';
                for(let m = 1; m < checkMsg.length; m++) {
                    activityString += `${checkMsg[m]} `;
                }
                if(activityString.length > 1) {
                    client.user.setActivity(activityString, {type: 'PLAYING'});
                }
            }
        }
        else { 
            console.log(`Status command came from non-owner, ignoring.`);
        }        
    }
    if(command == '!test') {
        if(message.author.id == botSettings.botOwnerID) {
            console.log(message);
        }
        else { 
            console.log(`Test command came from non-owner, ignoring.`);
        }
    }
    if(command == '!check') {
        console.log(message.guild.id);
        let checkSetting = await getGuildSetting(message.guild.id, 'check');
        console.log(checkSetting);
    }   
    if(command == '!setcheck') {
        setGuildSettings(message.guild.id, 'check', true);
        console.log(`enabled check`);
    }
    // the settings command
    if(command == '!frogbot'){
        if(message.author.id == botSettings.botOwnerID || message.author.id == message.channel.guild.ownerID) {
            if(checkMsg[1] !== undefined && checkMsg[1].toLowerCase() == 'channel') {
                if(checkMsg[2] !== undefined && checkMsg[2].toLowerCase() == 'add') {
                    if(checkMsg[3] !== undefined) {
                        let findChan = checkMsg[3].slice(2,-1);
                        try {
                            let foundChan = await client.channels.fetch(findChan);
                            enabledChannels.push(foundChan);
                            console.log(`Added ${foundChan} to enabled channels`);
                            message.channel.send(`Added channel to enabled list`);                            
                        }
                        catch(error) {
                            message.channel.send(`Error adding channel`);
                            console.log(error);
                        }
                    }
                    else {
                        message.channel.send(`Couldn't read channel name. (Format: !frogbot channel add #channel)`);
                    }
                }
                else if(checkMsg[2] !== undefined && checkMsg[2].toLowerCase() == 'remove') {
                    console.log(enabledChannels);
                    if(enabledChannels.includes(message.channel)) {
                        for(let c = 0; c < enabledChannels.length; c++) {
                            let findChan = checkMsg[3].slice(2,-1);
                            if(enabledChannels[c] == findChan) {
                                enabledChannels.splice(c,1);
                                console.log(`Removed ${findChan} from array`);
                                message.channel.send(`Removed channel from enabled list`);
                            }
                        }
                    }
                    else {
                        message.channel.send(`Channel is not in enabled list`);
                    }
                }
            }
            else {
                message.channel.send(`Unknown command`);
            }
        }
    }
}

client.on('message', message => {
    if(message.author.bot){ return; }
    processCommand(message);
});

client.on('guildCreate', guild => {
    console.log(guild);
});

client.login(botSettings.token);
