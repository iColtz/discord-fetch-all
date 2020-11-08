
<div align="center">
  <p>
    <a href="https://nodei.co/npm/discord-fetch-all/"><img src="https://nodei.co/npm/discord-fetch-all.png?downloads=true&stars=true" alt="npm install info" /></a>
  </p>
  <p>
    <a href="https://discord.gg/bRCvFy9"><img src="https://img.shields.io/discord/717861844127055873?color=7289da&logo=discord&logoColor=white" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/discord-fetch-all"><img src="https://img.shields.io/npm/v/discord-fetch-all.svg" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/discord-fetch-all"><img src="https://img.shields.io/npm/dt/discord-fetch-all.svg" alt="NPM downloads" /></a>
  </p>
</div>

## About
`discord-fetch-all` is an easy way to fetch all messages from a channel or all reactions from a message. 

## Usage
How to fetch all messages from a channel.
```js
const fetchAll = require('discord-fetch-all');

// First parameter needs to be a discord.js channel object
// Second parameter is a optional set of options.
const allMessages = await fetchAll.messages(channel, {
	reverseArray: true, // Reverse the returned array
	userOnly: true, // Only return messages by users
	botOnly: false, // Only return messages by bots
	pinnedOnly: false, // Only returned pinned messages
});

// Will return an array of all messages in the channel
// If the channel has no messages it will return an empty array
console.log(allMessages);
```

How to fetch all users that have reacted to a message.
```js
const fetchAll = require('discord-fetch-all');

// First parameter needs to be a discord.js message object
// Second parameter is a optional set of options.
const allMessages = await fetchAll.reactions(message, {
	userOnly: false, // Only return users that have reacted to the message
	botOnly: true, // Only return bots that have reacted to the message
});

// Will return an array of all users that have reacted
// If not users have reacted it will return an empty array
console.log(allMessages);
```

## Links
- [Discord server](https://discord.gg/2jkBmzy)
- [GitHub](https://github.com/iColtz/discord-fetch-all)
- [NPM](https://www.npmjs.com/package/discord-fetch-all)


## Help

If you don't understand something in the documentation, you are experiencing problems, don't hesitate to join our [Discord Server](https://discord.gg/2jkBmzy) to seek for some help.