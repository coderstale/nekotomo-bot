const fs = require('fs');
const path = require('path');

const settingsDir = path.resolve(__dirname, '../settings');

// Ensure the settings directory exists
if (!fs.existsSync(settingsDir)) {
    fs.mkdirSync(settingsDir);
}

function getSettings(guildId) {
    const filePath = path.join(settingsDir, `${guildId}.json`);
    if (!fs.existsSync(filePath)) {
        return { prefix: '!', customResponses: {} }; // Default settings
    }
    const settings = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return settings;
}

function saveSettings(guildId, settings) {
    const filePath = path.join(settingsDir, `${guildId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(settings, null, 4));
}

module.exports = {
    getSettings,
    saveSettings
};
