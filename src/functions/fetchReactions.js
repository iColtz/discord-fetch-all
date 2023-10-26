"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchReactions = void 0;
async function fetchReactions(message, reaction, options = {}) {
    let users = [];
    let lastID = "";
    while (true) {
        let fetchedUsers = lastID !== ""
            ? await message.reactions.cache.get(reaction)
            : await message.reactions.cache.get(reaction);
        if (!fetchedUsers)
            return [];
        fetchedUsers =
            lastID !== ""
                ? await fetchedUsers.users.fetch({ limit: 100, after: lastID })
                : await fetchedUsers.users.fetch({ limit: 100 });
        if (fetchedUsers.size === 0) {
            if (options.userOnly)
                users = users.filter((user) => !user.bot);
            if (options.botOnly)
                users = users.filter((user) => user.bot);
            return users;
        }
        else {
            fetchedUsers.forEach((u) => users.push(u));
            lastID = users[users.length - 1].id;
        }
    }
}
exports.fetchReactions = fetchReactions;
