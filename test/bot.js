const { Client } = require('discord.js');
const fetchAll = require('../src/index.js');
const client = new Client();

client.once('ready', () => console.log('Yoo test is ready!'));

client.on('message', async (message) => {
    if (message.content === '!fetchMessages') {
        const allMessages = await fetchAll.messages(message.channel, {
            reverseArray: true,
            userOnly: false,
            botOnly: false,
            pinnedOnly: true,
        });

        console.log(allMessages.map(msg => msg.content));
    }
});

client.login(require('./config.json').token);