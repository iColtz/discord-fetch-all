import { AnyChannel, Message } from "discord.js";

export interface FetchMessagesOptions {
  reverseArray?: boolean;
  userOnly?: boolean;
  botOnly?: boolean;
  pinnedOnly?: boolean;
  useCache?: boolean;
  onChunk?: (chunk: Message[]) => unknown;
}

export async function fetchMessages(
  channel: AnyChannel,
  options: FetchMessagesOptions = {},
) {
  if (!channel.isText())
    throw new Error(
      "discord-fetch-all: channel parameter is not a textual channel.",
    );

  let messages: Message[] = [];
  let lastID: string | undefined;

  while (true) {
    const fetchedMessages = await channel.messages.fetch({
      limit: 100,
      ...(lastID && { before: lastID }),
    });

    if (options.onChunk) options.onChunk(Array.from(fetchedMessages.values()));

    if (fetchedMessages.size === 0) {
      if (options.reverseArray) messages = messages.reverse();
      if (options.userOnly)
        messages = messages.filter((msg) => !msg.author.bot);
      if (options.botOnly) messages = messages.filter((msg) => msg.author.bot);
      if (options.pinnedOnly) messages = messages.filter((msg) => msg.pinned);
      return messages;
    }

    if (options.useCache)
      messages = messages.concat(Array.from(fetchedMessages.values()));

    lastID = fetchedMessages.lastKey();
  }
}
