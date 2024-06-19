const ganyuQuotes = [
    "Liyue's prosperity is hard-earned and should be cherished.",
    "The flowers in Liyue bloom beautifully this time of year.",
    "I strive to protect Liyue with all my strength.",
    "My duty is to ensure the safety and prosperity of the people.",
    "Ganyu here! How can I help?"
];

module.exports = {
    name: 'ganyuquote',
    description: 'Get a random Ganyu quote.',
    cooldown: 5,
    execute(message, args) {
        const quote = ganyuQuotes[Math.floor(Math.random() * ganyuQuotes.length)];
        message.channel.send(quote);
    },
};
