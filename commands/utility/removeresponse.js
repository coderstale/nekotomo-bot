const { getSettings, saveSettings } = require('../../utils/settings');

module.exports = {
    name: 'removeresponse',
    description: 'Remove a custom response for a specific trigger word.',
    cooldown: 5,
    execute(message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('You do not have permission to remove a custom response.');
        }

        const [trigger] = args;

        if (!trigger) {
            return message.reply('Please provide a trigger word.');
        }

        const settings = getSettings(message.guild.id);
        if (settings.customResponses && settings.customResponses[trigger]) {
            delete settings.customResponses[trigger];
            saveSettings(message.guild.id, settings);
            return message.channel.send(`Custom response for trigger \`${trigger}\` has been removed.`);
        }

        message.reply(`No custom response found for trigger \`${trigger}\`.`);
    },
};
