const scenarios = require('../../config/scenarios');

module.exports = {
    name: 'greet',
    description: 'Greet Ganyu and receive a response.',
    category: 'Interaction',
    async execute(message, args) {
        try {
            const response = scenarios.greet[Math.floor(Math.random() * scenarios.greet.length)];
            await message.channel.send(response);
        } catch (error) {
            console.error('Error executing greet command:', error);
            message.reply('There was an error trying to execute the greet command.');
        }
    },
};
