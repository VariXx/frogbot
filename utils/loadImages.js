const fs = require('fs');

function loadImages(readDir)
{
    let images = [];
    try {
        fs.readdir(readDir, (error, files) => {
            console.log('Loading images...');
            if(error){
                console.log(`Error loading directory ${readDir}\n${error}`);
            }
            else {
                files.forEach(file => {
                    if(file.includes('.jpg') || file.includes('.png') || file.includes('.gif')) {
                        images.push(file);
                    }

                });
            }
            console.log(`Loaded ${images.length} images from ${readDir}`);
        });
        return images;
    }
    catch(error) { console.log(error) };
}

module.exports.loadImages = loadImages;