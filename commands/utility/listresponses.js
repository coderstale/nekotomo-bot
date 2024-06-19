const { getSettings } = require('../../utils/settings');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'listresponses',
    description: 'List all custom responses.',
    cooldown: 5,
    execute(message, args) {
        const settings = getSettings(message.guild.id);

        if (!settings.customResponses || Object.keys(settings.customResponses).length === 0) {
            return message.channel.send('No custom responses found.');
        }

        const embed = new MessageEmbed()
            .setTitle('Custom Responses')
            .setColor('#87CEEB');

        for (const [trigger, response] of Object.entries(settings.customResponses)) {
            embed.addField(trigger, response);
        }

        message.channel.send({ embeds: [embed] });
    },
};
