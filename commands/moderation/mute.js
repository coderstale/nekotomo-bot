module.exports = {
    name: 'mute',
    description: 'Mute a user in the server.',
    cooldown: 5,
    async execute(message, args) {
        if (!message.member.permissions.has('MUTE_MEMBERS')) {
            return message.reply('You do not have permission to mute members.');
        }

        const targetUser = message.mentions.members.first();
        if (!targetUser) {
            return message.reply('Please mention a user to mute.');
        }

        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) {
            try {
                muteRole = await message.guild.roles.create({
                    name: 'Muted',
                    color: '#555555',
                    permissions: []
                });

                // Update permissions for each channel
                message.guild.channels.cache.forEach(async (channel) => {
                    await channel.permissionOverwrites.create(muteRole, {
                        SEND_MESSAGES: false,
                        SPEAK: false,
                        ADD_REACTIONS: false
                    });
                });

                message.channel.send('Mute role created successfully.');
            } catch (error) {
                console.error('Error creating mute role:', error);
                return message.reply('There was an error creating the mute role.');
            }
        }

        try {
            await targetUser.roles.add(muteRole);
            message.channel.send(`Successfully muted ${targetUser.user.tag}`);
        } catch (error) {
            console.error('Error muting user:', error);
            message.reply('There was an error trying to mute this user.');
        }
    },
};
