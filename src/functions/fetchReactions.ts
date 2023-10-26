import { Message, User, MessageReaction, Collection } from "discord.js";

export async function fetchReactions(
  message: Message,
  reaction: string,
  options = { botOnly: false, userOnly: false }
) {
  let users: User[] = [];
  let lastID = "";

  while (true) {
    let fetchedUsers: (MessageReaction | undefined) | Collection<string, User> =
      lastID !== ""
        ? await message.reactions.cache.get(reaction)
        : await message.reactions.cache.get(reaction);

    if (!fetchedUsers) return [];

    fetchedUsers =
      lastID !== ""
        ? await fetchedUsers.users.fetch({ limit: 100, after: lastID })
        : await fetchedUsers.users.fetch({ limit: 100 });

    if (fetchedUsers.size === 0) {
      if (options.userOnly) users = users.filter((user) => !user.bot);
      if (options.botOnly) users = users.filter((user) => user.bot);
      return users;
    } else {
      fetchedUsers.forEach((u) => users.push(u));
      lastID = users[users.length - 1].id;
    }
  }
}
