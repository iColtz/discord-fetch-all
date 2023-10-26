"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMessages = void 0;
async function fetchMessages(channel, options = {
    reverseArray: false,
    userOnly: false,
    botOnly: false,
    pinnedOnly: false,
}) {
    if (!channel.isText())
        throw new Error("discord-fetch-all: channel parameter is not a instance of a discord channel.");
    const { reverseArray, userOnly, botOnly, pinnedOnly } = options;
    let messages = [];
    let lastID;
    while (true) {
        const fetchedMessages = await channel.messages.fetch({
            limit: 100,
            ...(lastID && { before: lastID }),
        });
        if (fetchedMessages.size === 0) {
            if (reverseArray)
                messages = messages.reverse();
            if (userOnly)
                messages = messages.filter((msg) => !msg.author.bot);
            if (botOnly)
                messages = messages.filter((msg) => msg.author.bot);
            if (pinnedOnly)
                messages = messages.filter((msg) => msg.pinned);
            return messages;
        }
        messages = messages.concat(Array.from(fetchedMessages.values()));
        lastID = fetchedMessages.lastKey();
    }
}
exports.fetchMessages = fetchMessages;
