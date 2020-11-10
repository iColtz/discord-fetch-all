import { Message, TextChannel } from 'discord.js';

export default async (channel: TextChannel, options = { reverseArray: false, userOnly: false, botOnly: false, pinnedOnly: false }) => {
    if (!(channel instanceof TextChannel)) throw new Error('discord-fetch-all: channel parameter is not a instance of a discord channel.');
    const { reverseArray, userOnly, botOnly, pinnedOnly } = options;
    let messages: Message[] = []
    let lastID = '';

    while (true) {
        var fetchedMessages = lastID !== ''
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