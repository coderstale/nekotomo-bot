const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Check the bot\'s latency and API response time.',
    category: 'Utility',
    cooldown: 5,
    async execute(message, args) {
        const msg = await message.channel.send('Measuring ping...');
        const latency = msg.createdTimestamp - message.createdTimestamp;
        const apiLatency = Math.round(message.client.ws.ping);

        const pingEmbed = new EmbedBuilder()
            .setColor('#FFC0CB') 
            .setTitle('NekoTomo Ping')
            .setDescription('Here is the current latency and API response time:')
            .addFields(
                { name: 'Latency', value: `${latency} ms`, inline: true },
                { name: 'API Latency', value: `${apiLatency} ms`, inline: true }
            )
            .setFooter({ text: 'Meow! Here is your ping information.', iconURL: 'https://i.imgur.com/t6TkgND.png' });

        await msg.edit({ content: '', embeds: [pingEmbed] });
    },
};
