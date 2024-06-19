const catFacts = [
    "Cats sleep for 70% of their lives.",
    "A group of cats is called a clowder.",
    "Cats have five toes on their front paws, but only four on the back paws.",
    "A cat's nose is as unique as a human's fingerprint.",
    "Cats can make over 100 different sounds."
];

module.exports = {
    name: 'catfact',
    description: 'Get a random cat fact.',
    cooldown: 5,
    execute(message, args) {
        const fact = catFacts[Math.floor(Math.random() * catFacts.length)];
        message.channel.send(fact);
    },
};
