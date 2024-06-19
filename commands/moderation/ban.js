module.exports = {
    name: 'ban',
    description: 'Ban a user from the server.',
    category: 'Moderation',
    cooldown: 5,
    async execute(message, args) {
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply('You do not have permission to ban members.');
        }

        const targetUser = message.mentions.members.first();
        if (!targetUser) {
            return message.reply('Please mention a user to ban.');
        }

        if (!targetUser.bannable) {
            return message.reply('I cannot ban this user.');
        }

        const reason = args.slice(1).join(' ') || 'No reason provided';
        try {
            await targetUser.ban({ reason });
            message.channel.send(`Successfully banned ${targetUser.user.tag}`);
        } catch (error) {
            console.error('Error banning user:', error);
            message.reply('There was an error trying to ban this user.');
        }
    },
};
