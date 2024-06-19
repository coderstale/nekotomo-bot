module.exports = {
    name: 'feed',
    description: 'Feed NekoTomo and see a happy response.',
    execute(message, args) {
        const responses = [
            "Yum! This is delicious! Thank you!",
            "*nibbles on the food* Meow~",
            "*purrs contentedly* You're so kind!",
            "*eats happily* I love this!"
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        message.channel.send(response);
    },
};
