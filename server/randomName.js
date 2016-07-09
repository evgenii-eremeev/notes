// список случайных имен
const randomNames = require('./random_names.json');
const crypto = require('crypto');


function randomName(socketId) {
    const md5sum = crypto.createHash('md5');
    const hash = md5sum.update(socketId).digest('hex');
    const randomIdx = (parseInt(hash, 16) / 2e+25) % randomNames.length;
    return randomNames[Math.floor(randomIdx)].name;
};

module.exports = randomName;
