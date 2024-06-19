module.exports = {
    name: 'kick',
    description: 'Kick a user from the server.',
    cooldown: 5,
    async execute(message, args) {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.reply('You do not have permission to kick members.');
        }

        const targetUser = message.mentions.members.first();
        if (!targetUser) {
            return message.reply('Please mention a user to kick.');
        }

        if (!targetUser.kickable) {
            return message.reply('I cannot kick this user.');
        }

        const reason = args.slice(1).join(' ') || 'No reason provided';
        try {
            await targetUser.kick(reason);
            message.channel.send(`Successfully kicked ${targetUser.user.tag}`);
        } catch (error) {
            console.error('Error kicking user:', error);
            message.reply('There was an error trying to kick this user.');
        }
    },
};
