"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMessages = void 0;
async function fetchMessages(channel, options = {}) {
    if (!channel.isText())
        throw new Error("discord-fetch-all: channel parameter is not a textual channel.");
    let messages = [];
    let lastID;
    while (true) {
        const fetchedMessages = await channel.messages.fetch({
            limit: 100,
            ...(lastID && { before: lastID }),
        });
        if (options.onChunk)
            options.onChunk(Array.from(fetchedMessages.values()));
        if (fetchedMessages.size === 0) {
            if (options.reverseArray)
                messages = messages.reverse();
            if (options.userOnly)
                messages = messages.filter((msg) => !msg.author.bot);
            if (options.botOnly)
                messages = messages.filter((msg) => msg.author.bot);
            if (options.pinnedOnly)
                messages = messages.filter((msg) => msg.pinned);
            return messages;
        }
        if (options.useCache)
            messages = messages.concat(Array.from(fetchedMessages.values()));
        lastID = fetchedMessages.lastKey();
    }
}
exports.fetchMessages = fetchMessages;
