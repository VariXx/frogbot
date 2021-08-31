const fs = require('fs');
const util = require('util');
const guildsSettingsDir = require('../botSettings.json').guildSettingsDir

async function getAllGuildSettings(guildSettingsFilename) {
    let guildSettings = {};
    let guildSettingsFilePath = `${guildsSettingsDir}${guildSettingsFilename}.frogbot`;    
    const readFile = util.promisify(fs.readFile);
    if(fs.existsSync(guildSettingsFilePath)) {     
        try {
            const settingsFile = await readFile(guildSettingsFilePath);
            guildSettings = JSON.parse(settingsFile);
            // guildSettings.successful = true;
            // console.log(guildSettings);
        }
        catch(error) {
            console.log(error);
            // guildSettings.error = error;
            // guildSettings.successful = false;
        }
    }
    else {
        let errorMsg = `Could not load file: ${guildSettingsFilePath}`;
        console.error(errorMsg);
        // guildSettings.error = errorMsg;
        // guildSettings.successful = false;
    }
    return guildSettings;
}

async function getGuildSetting(guildSettingsFilename, setting) {
    let guildSettings = {};
    let guildSettingsFilePath = `${guildsSettingsDir}${guildSettingsFilename}.frogbot`;        
    const readFile = util.promisify(fs.readFile);
    if(fs.existsSync(guildSettingsFilePath)) {     
        try {
            const settingsFile = await readFile(guildSettingsFilePath);
            guildSettings = JSON.parse(settingsFile);
            if(guildSettings.hasOwnProperty(setting)) {
                return guildSettings[setting];
            }
            else {
                return undefined;
            }
        }
        catch(error) {
            console.log(error);
            return undefined;
            // guildSettings.error = error;
            // guildSettings.successful = false;
        }
    }
    else {
        let errorMsg = `Could not load file: ${guildSettingsFilePath}`;
        console.error(errorMsg);
        return undefined;
    }
}

module.exports.getAllGuildSettings = getAllGuildSettings;
module.exports.getGuildSetting = getGuildSetting;
