const fs = require('fs');
const botSettings = require('./botSettings.json');
const Discord = require('discord.js');
const client = new Discord.Client();

// https://discordapp.com/oauth2/authorize?client_id=697816077547339797&scope=bot&permissions=378944 

let frogs = [];
let spideys = [];
let alexJones = [];

function loadFrogs()
{
    frogs = [];
    fs.readdir(botSettings.frogsDir, (error, files) => 
    {
        console.log('Loading frogs...');
        if(error)
        {
            console.log(error);
        }
        files.forEach(file => 
        {
            if(file.includes('.jpg') || file.includes('.png') || file.includes('.gif'))
            {
                frogs.push(file);
                // console.log(`Loaded frog ${file}.`);
            }

        });
        console.log(`Loaded ${frogs.length} frogs.`);
    });
}

function loadSpideys()
{
    spideys = [];
    fs.readdir(botSettings.spideysDir, (error, files) => 
    {
        console.log('Loading spideys...');
        if(error)
        {
            console.log(error);
        }
        files.forEach(file => 
        {
            if(file.includes('.jpg') || file.includes('.png') || file.includes('.gif'))
            {
                spideys.push(file);
                // console.log(`Loaded spidey ${file}.`);
            }

        });
        console.log(`Loaded ${spideys.length} spideys.`);
    });
}

function loadAlexJones()
{
    alexJones = [];
    fs.readdir(botSettings.alexJonesDir, (error, files) => 
    {
        console.log('Loading alexJones...');
        if(error)
        {
            console.log(error);
        }
        files.forEach(file => 
        {
            if(file.includes('.jpg') || file.includes('.png') || file.includes('.gif') || file.includes('.webm') || file.includes('.mp4'))
            {
                alexJones.push(file);
            }

        });
        console.log(`Loaded ${alexJones.length} alexJones.`);
    });
}

client.once('ready', () => {
    try
    {
        loadFrogs();
    }
    catch(error)
    {
        console.log('Loading frogs failed. Sad day.');
        console.log(error);
    }
    try 
    {
        loadSpideys();
    }
    catch(error)
    {
        console.log('Loading spideys failed.');
        console.log(error);
    }
    try 
    {
        loadAlexJones();
    }
    catch(error)
    {
        console.log('Loading alexjones failed. The gloablists won.');
        console.log(error);
    }    
    client.user.setActivity('the globalists', {type: 'PLAYING'});
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
                try
                {
                    loadFrogs();
                    loadSpideys();
                    loadAlexJones();
                    message.channel.send('Images reloaded.');
                }
                catch(error)
                {
                    console.log(error);
                }
            }
        }
    }
});

client.login(botSettings.token);
