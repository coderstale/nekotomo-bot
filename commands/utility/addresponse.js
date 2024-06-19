const { getSettings, saveSettings } = require('../../utils/settings');

module.exports = {
    name: 'addresponse',
    description: 'Add a custom response for a specific trigger word.',
    cooldown: 5,
    execute(message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('You do not have permission to add a custom response.');
        }

        const [trigger, ...responseArr] = args;
        const response = responseArr.join(' ');

        if (!trigger || !response) {
            return message.reply('Please provide both a trigger word and a response.');
        }

        const settings = getSettings(message.guild.id);
        if (!settings.customResponses) {
            settings.customResponses = {};
        }
        settings.customResponses[trigger] = response;
        saveSettings(message.guild.id, settings);

        message.channel.send(`Custom response added for trigger \`${trigger}\`.`);
    },
};
