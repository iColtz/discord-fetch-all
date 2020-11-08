module.exports = async (message, reaction) => {
    const users = [];
    let lastID = '';

    while (true) { // eslint-disable-line no-constant-condition
        var fetchedUsers = lastID !== '' // eslint-disable-line no-var
                ? (await message.reactions.cache.get(reaction))
                : (await message.reactions.cache.get(reaction));

        if (!fetchedUsers) return [];

        fetchedUsers = lastID !== '' 
            ? await fetchedUsers.users.fetch({ limit: 100, after: lastID }) 
            : await fetchedUsers.users.fetch({ limit: 100 });

        if (fetchedUsers.size === 0) {
            return users;
        }
        else {
            fetchedUsers.forEach((u) => users.push(u));
            lastID = users[users.length - 1].id;
        }
    }
};