const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'serveravatar',
    aliases: ['sav'],
    description: 'Displays the server\'s avatar.',
    category: 'Utility',
    cooldown: 5,
    execute(message, args) {
        const { guild } = message;

        if (!guild.iconURL()) {
            return message.reply('This server does not have an avatar.');
        }

        const serverAvatarEmbed = new EmbedBuilder()
            .setColor('#87CEEB') // Sky blue color
            .setTitle(`Server Avatar: ${guild.name}`)
            .setImage(guild.iconURL({ dynamic: true, size: 1024 }))
            .setFooter({ text: 'Server Avatar', iconURL: guild.iconURL({ dynamic: true }) });

        message.channel.send({ embeds: [serverAvatarEmbed] });
    },
};
