const { getSettings, saveSettings } = require('../../utils/settings');

module.exports = {
    name: 'setprefix',
    description: 'Change the bot prefix for this server.',
    cooldown: 5,
    execute(message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('You do not have permission to change the prefix.');
        }

        const newPrefix = args[0];
        if (!newPrefix) {
            return message.reply('Please provide a new prefix.');
        }

        const settings = getSettings(message.guild.id);
        settings.prefix = newPrefix;
        saveSettings(message.guild.id, settings);

        message.channel.send(`Prefix has been changed to \`${newPrefix}\``);
    },
};
