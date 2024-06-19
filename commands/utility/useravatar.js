const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'useravatar',
    aliases: ['uav'],
    description: 'Displays a user\'s avatar.',
    category: 'Utility',
    cooldown: 5,
    async execute(message, args) {
        let targetUser;

        // Check if user ID is provided
        if (args.length > 0) {
            try {
                // Fetch user by ID
                targetUser = await message.client.users.fetch(args[0]);
            } catch (error) {
                // Fetch user by username
                const username = args.join(' ');
                targetUser = message.guild.members.cache.find(member => member.user.username.toLowerCase() === username.toLowerCase());
                if (!targetUser) {
                    return message.reply('Could not find a user with that ID or username.');
                }
                targetUser = targetUser.user;
            }
        } else {
            // Fetch user by mention
            targetUser = message.mentions.users.first() || message.author;
        }

        if (!targetUser) {
            return message.reply('Please mention a user or provide a valid user ID or username.');
        }

        const userAvatarEmbed = new EmbedBuilder()
            .setColor('#87CEEB') // Sky blue color
            .setTitle(`User Avatar: ${targetUser.username}`)
            .setImage(targetUser.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setFooter({ text: 'User Avatar', iconURL: targetUser.displayAvatarURL({ dynamic: true }) });

        message.channel.send({ embeds: [userAvatarEmbed] });
    },
};
