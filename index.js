const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const selectResponse = require('./utils/responseSelector');
const { getSettings, saveSettings } = require('./utils/settings');
const logger = require('./utils/logger');

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const TOKEN = process.env.BOT_TOKEN;

client.commands = new Collection();
const cooldowns = new Collection(); 

const readCommands = (dir, category = '') => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            readCommands(fullPath, file);
        } else if (file.endsWith('.js')) {
            const command = require(fullPath);
            command.category = category || 'Uncategorized';
            client.commands.set(command.name, command);
            if (command.aliases) {
                command.aliases.forEach(alias => {
                    if (!client.commands.has(alias)) {
                        client.commands.set(alias, command);
                    }
                });
            }
        }
    }
};

readCommands(path.join(__dirname, 'commands'));

client.once('ready', () => {
    logger.info('NekoTomo is online!');
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const settings = getSettings(message.guild.id);
    const prefix = settings.prefix;

    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);

        if (!command) {
            message.reply('That command does not exist!');
            return;
        }

        // Cooldown logic
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000; // Default cooldown is 3 seconds

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try {
            await command.execute(message, args);
        } catch (error) {
            logger.error(`Error executing command: ${error.stack || error}`);
            message.reply('There was an error trying to execute that command.');
        }
    } else {
        const response = selectResponse(message.content);
        if (response) {
            message.channel.send(response).catch(logger.error);
        }
    }
});

process.on('unhandledRejection', error => {
    logger.error(`Unhandled promise rejection: ${error.stack || error}`);
});

process.on('uncaughtException', error => {
    logger.error(`Uncaught exception: ${error.stack || error}`);
});

client.login(TOKEN);
