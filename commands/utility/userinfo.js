const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'userinfo',
    aliases: ['uinfo'],
    description: 'Displays information about a user.',
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

        const member = message.guild.members.cache.get(targetUser.id);

        const userInfoEmbed = new EmbedBuilder()
            .setColor('#87CEEB') // Sky blue color
            .setTitle(`User Info: ${targetUser.username}`)
            .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Username', value: `${targetUser.tag}`, inline: true },
                { name: 'User ID', value: `${targetUser.id}`, inline: true },
                { name: 'Nickname', value: `${member.nickname || 'None'}`, inline: true },
                { name: 'Joined Server', value: `${member.joinedAt.toDateString()}`, inline: true },
                { name: 'Account Created', value: `${targetUser.createdAt.toDateString()}`, inline: true },
                { name: 'Roles', value: `${member.roles.cache.map(role => role.name).join(', ')}`, inline: true }
            )
            .setFooter({ text: 'User Information', iconURL: targetUser.displayAvatarURL({ dynamic: true }) });

        message.channel.send({ embeds: [userInfoEmbed] });
    },
};
