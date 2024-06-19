module.exports = {
    name: 'purge',
    description: 'Deletes messages from the channel.',
    category: 'Moderation',
    aliases: ['clear', 'prune'],
    cooldown: 5,
    async execute(message, args) {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            return message.reply('You do not have permission to manage messages.');
        }

        const amount = parseInt(args[0], 10);
        if (isNaN(amount) || amount <= 0) {
            return message.reply('Please provide a valid number of messages to delete.');
        }

        let deleteAmount = amount;
        while (deleteAmount > 0) {
            const batch = Math.min(deleteAmount, 100);
            try {
                const deletedMessages = await message.channel.bulkDelete(batch, true);
                deleteAmount -= deletedMessages.size;
                if (deletedMessages.size === 0) break;
            } catch (error) {
                console.error('Error deleting messages:', error);
                return message.reply('There was an error trying to delete messages.');
            }
        }

        message.channel.send(`Successfully deleted ${amount} messages.`).then(msg => {
            setTimeout(() => msg.delete(), 5000);
        });
    },
};
