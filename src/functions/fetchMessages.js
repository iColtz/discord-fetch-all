module.exports = async (channel, options = {}) => {
    const { reverseArray = false } = options;
    let messages = [];
    let lastID = '';

    while (true) { // eslint-disable-line no-constant-condition
        var fetchedMessages = lastID !== '' // eslint-disable-line no-var
            ? await channel.messages.fetch({ limit: 100, before: lastID })
            : (fetchedMessages = await channel.messages.fetch({ limit: 100 }));

        if (fetchedMessages.size === 0) {
            if (reverseArray) messages = messages.reverse();
            return messages;
        }

        messages = messages.concat(Array.from(fetchedMessages.values()));
        lastID = fetchedMessages.lastKey();
    }
};