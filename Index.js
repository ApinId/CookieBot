const { Client, GatewayIntentBits } = require('discord.js');
const WebSocket = require('ws');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const ws = new WebSocket('wss://your-roblox-websocket-here'); // Replace with Roblox side websocket

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', msg => {
  if (msg.content.startsWith('!exe')) {
    const code = msg.content.slice(5);
    ws.send(code);
    msg.react('✅').catch(() => {});
  }
});

ws.on('open', () => {
  console.log('WebSocket Connected');
});

ws.on('message', msg => {
  console.log('[Roblox] ->', msg.toString());
});

client.login(process.env.DISCORD_TOKEN);
