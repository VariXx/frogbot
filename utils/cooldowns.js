const { getGuildSetting } = require('./getGuildSettings');
const { setGuildSetting } = require('./setGuildSetting');

const commandCooldown = 10; // 10 seconds TODO - make this a per-guild setting

async function getCooldown(guildId, command) {
    try {
        const returnCooldown = await getGuildSetting(guildId, command);
        return returnCooldown;
    }
    catch(error) {
        console.log(`Error checking cooldown for ${command} on guild ${guildId}`);
        console.log(error);
    }
}

async function setCooldown(guildId, command) {
    try { await setGuildSetting(guildId, `${command}Timestamp`, Date.now()); }
    catch(error) {
        console.log(`Error setting cooldown for ${command} on guild ${guildId}`);
        console.log(error);
    }
}

async function checkCooldown(guildId, command) {    
    // returning true means the command can run
    try {
        let oldCooldown = await getCooldown(guildId, `${command}Timestamp`);
        if(oldCooldown === undefined) { 
            console.log(`Cooldown setting for ${command} guild ${guildId} not found. Using  0.`);
            oldCooldown = 0;
            return true;
        }
        // const timeNow = Date.now(); 
        // console.log(`oldCooldown: ${oldCooldown}\ntimeNow: ${timeNow}`);        
        let timeMath = (Date.now() - oldCooldown) / 1000;
        if(timeMath > commandCooldown) { return true; }
        return false;
    }
    catch(error) {
        console.log(`Error checking cooldown for ${command} on guild ${guildId}`);
        console.log(error);        
    }
    return false;
}

module.exports.getCooldown = getCooldown;
module.exports.setCooldown = setCooldown;
module.exports.checkCooldown = checkCooldown;