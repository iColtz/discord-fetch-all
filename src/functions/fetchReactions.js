'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
// const discord_js_1 = require('discord.js');
exports.default = async (message, reaction, options = { botOnly: false, userOnly: false }) => {
    // if (!(message instanceof discord_js_1.Message)) {throw new Error('discord-fetch-all: channel parameter is not a instance of a discord channel.');}
    // if (typeof reaction !== 'string') {throw new Error('discord-fetch-all: reaction parameter is not a string.');}
    const { userOnly, botOnly } = options;
    let users = [];
    let lastID = '';
    while (true) { // eslint-disable-line no-constant-condition
        let fetchedUsers = lastID !== ''
            ? (await message.reactions.cache.get(reaction))
            : (await message.reactions.cache.get(reaction));
        if (!fetchedUsers) {return [];}
        fetchedUsers = lastID !== ''
            ? await fetchedUsers.users.fetch({ limit: 100, after: lastID })
            : await fetchedUsers.users.fetch({ limit: 100 });
        if (fetchedUsers.size === 0) {
            if (userOnly) {users = users.filter(user => !user.bot);}
            if (botOnly) {users = users.filter(user => user.bot);}
            return users;
        }
        else {
            fetchedUsers.forEach((u) => users.push(u));
            lastID = users[users.length - 1].id;
        }
    }
};
