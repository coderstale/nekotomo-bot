const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'List all available commands',
    category: 'Utility',
    cooldown: 5,
    execute(message, args) {
        const commands = message.client.commands;

        const categories = {};
        commands.forEach(command => {
            const category = command.category || 'Uncategorized';
            if (!categories[category]) {
                categories[category] = [];
            }
            if (!categories[category].find(cmd => cmd.name === command.name)) {
                categories[category].push(command);
            }
        });

        // Create the embed message
        const helpEmbed = new EmbedBuilder()
            .setColor('#87CEEB') // Sky blue color
            .setTitle('NekoTomo Commands')
            .setDescription('Here are all the commands you can use:')
            .setFooter({ text: 'Meow! Use these commands to interact with me.', iconURL: 'https://i.imgur.com/t6TkgND.png' });

        for (const [category, commands] of Object.entries(categories)) {
            const commandDescriptions = commands.map(cmd => `**${cmd.name}**: ${cmd.description}`).join('\n');
            helpEmbed.addFields([{ name: category, value: commandDescriptions }]);
        }

        message.channel.send({ embeds: [helpEmbed] });
    },
};
