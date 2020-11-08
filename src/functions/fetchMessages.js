module.exports = async (channel, options = {}) => {
    const { 
            reverseArray = false,  
            userOnly = false,
            botOnly = false,
            pinnedOnly = false,
        } = options;
    let messages = [];
    let lastID = '';

    while (true) { // eslint-disable-line no-constant-condition
        var fetchedMessages = lastID !== '' // eslint-disable-line no-var
            ? await channel.messages.fetch({ limit: 100, before: lastID })
            : (fetchedMessages = await channel.messages.fetch({ limit: 100 }));

        if (fetchedMessages.size === 0) {
            if (reverseArray) messages = messages.reverse();
            if (userOnly) messages = messages.filter(msg => !msg.author.bot);
            if (botOnly) messages = messages.filter(msg => msg.author.bot);
            if (pinnedOnly) messages = messages.filter(msg => msg.pinned);
            return messages;
        }

        messages = messages.concat(Array.from(fetchedMessages.values()));
        lastID = fetchedMessages.lastKey();
    }
};