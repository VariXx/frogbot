const fs = require('fs');
const botSettings = require('../botSettings.json');

async function loadImages(imgDir) {
    let images = [];
    try {
        console.log('Loading images');
        const fileNames = await fs.promises.readdir(imgDir);
        for (let file of fileNames) {
            if(file.includes('.jpg') || file.includes('.png') || file.includes('.gif')) { 
                images.push(file); 
            }
        }
        console.log(`Loaded ${images.length} images from ${imgDir}`);
        return images;
    }
    catch(error) {
        console.log(`Error loading images. ${error}`);
    }
}

module.exports.loadImages = loadImages;