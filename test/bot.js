const { Client } = require('discord.js');
const fetchAll = require('../src/index.js');
const client = new Client();

client.once('ready', () => console.log('Yoo test is ready!'));

client.on('message', async (message) => {
    if (message.content === '!fetchMessages') {
        const allMessages = await fetchAll.messages(message.channel, {
            reverseArray: true,
            userOnly: true,
            botOnly: false,
            pinnedOnly: false,
        });

        console.log(allMessages.map(msg => msg.content));
    }
    else if (message.content === '!fetchReactions') {
        const msg = await message.channel.messages.fetch('774770590657282069');
        const allReactions = await fetchAll.reactions(msg, '🤔', {
            userOnly: false,
            botOnly: true,
        });

        console.log(allReactions.map(user => user.tag));
    }
});

client.login(require('./config.json').token);