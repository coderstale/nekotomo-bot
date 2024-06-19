const scenarios = require('../../config/scenarios');

module.exports = {
    name: 'farewell',
    description: 'Say goodbye to Ganyu.',
    category: 'Interaction',
    execute(message, args) {
        const response = scenarios.farewell[Math.floor(Math.random() * scenarios.farewell.length)];
        message.channel.send(response);
    },
};
