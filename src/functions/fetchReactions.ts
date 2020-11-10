import { Message, User, MessageReaction, Collection } from 'discord.js';

export default async (message: Message, reaction: String, options = { botOnly: false, userOnly: false }) => {
    if (!(message instanceof Message)) throw new Error('discord-fetch-all: channel parameter is not a instance of a discord channel.');
    if (typeof reaction !== 'string') throw new Error('discord-fetch-all: reaction parameter is not a string.');
    const { userOnly, botOnly } = options;
    let users: User[] = []
    let lastID = '';

    while (true) {
        let fetchedUsers: (MessageReaction | undefined) | Collection<string, User> = lastID !== ''
                ? (await message.reactions.cache.get(reaction))
                : (await message.reactions.cache.get(reaction));

        if (!fetchedUsers) return [];

        fetchedUsers = lastID !== ''
            ? await fetchedUsers.users.fetch({ limit: 100, after: lastID }) 
            : await fetchedUsers.users.fetch({ limit: 100 });

        if (fetchedUsers.size === 0) {
            if (userOnly) users = users.filter(user => !user.bot);
            if (botOnly) users = users.filter(user => user.bot);
            return users;
        }
        else {
            fetchedUsers.forEach((u) => users.push(u));
            lastID = users[users.length - 1].id;
        }
    }
};