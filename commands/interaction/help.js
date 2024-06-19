const scenarios = require('../../config/scenarios');

module.exports = {
    name: 'help',
    description: 'Ask Ganyu for help.',
    category: 'Interaction',
    execute(message, args) {
        const response = scenarios.help[Math.floor(Math.random() * scenarios.help.length)];
        message.channel.send(response);
    },
};
