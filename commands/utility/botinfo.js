const { EmbedBuilder } = require('discord.js');
const packageJson = require('../../package.json');

module.exports = {
    name: 'botinfo',
    description: 'Displays information about the bot.',
    category: 'Utility',
    cooldown: 5,
    async execute(message, args) {
        const { client } = message;

        const botInfoEmbed = new EmbedBuilder()
            .setColor('#FFC0CB') 
            .setTitle('NekoTomo Bot Info')
            .setDescription('Here is some information about NekoTomo:')
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Bot Name', value: client.user.username, inline: true },
                { name: 'Bot ID', value: client.user.id, inline: true },
                { name: 'Version', value: packageJson.version, inline: true },
                { name: 'Library', value: 'Discord.js v14', inline: true },
                { name: 'Servers', value: `${client.guilds.cache.size}`, inline: true },
                { name: 'Users', value: `${client.users.cache.size}`, inline: true },
                { name: 'Created At', value: `${client.user.createdAt.toDateString()}`, inline: true },
                { name: 'Developer', value: 'cattosawr', inline: true } 
            )
            .setFooter({ text: 'Meow! Here is your bot information.', iconURL: 'https://i.imgur.com/t6TkgND.png' });

        await message.channel.send({ embeds: [botInfoEmbed] });
    },
};
