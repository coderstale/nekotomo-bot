const ganyuResponses = require('../../responses/ganyuResponses');

module.exports = {
    name: 'quote',
    description: 'Get a random Ganyu quote.',
    cooldown: 5,
    execute(message, args) {
        const quotes = ganyuResponses.quotes;
        if (!quotes || quotes.length === 0) {
            return message.reply('No quotes available.');
        }
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        message.channel.send(quote);
    },
};
