const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Displays information about the server.',
    category: 'Utility',
    cooldown: 5,
    execute(message, args) {
        const { guild } = message;

        const serverInfoEmbed = new EmbedBuilder()
            .setColor('#87CEEB') // Sky blue color
            .setTitle(`Server Info: ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: 'Server Name', value: guild.name, inline: true },
                { name: 'Server ID', value: guild.id, inline: true },
                { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Member Count', value: `${guild.memberCount}`, inline: true },
                { name: 'Created At', value: `${guild.createdAt.toDateString()}`, inline: true },
                { name: 'Verification Level', value: `${guild.verificationLevel}`, inline: true },
                { name: 'Number of Channels', value: `${guild.channels.cache.size}`, inline: true },
                { name: 'Number of Roles', value: `${guild.roles.cache.size}`, inline: true }
            )
            .setFooter({ text: 'Server Information', iconURL: guild.iconURL({ dynamic: true }) });

        message.channel.send({ embeds: [serverInfoEmbed] });
    },
};
