import { dirname, importx } from '@discordx/importer';
import type { Interaction, Message } from 'discord.js';
import { IntentsBitField, WebhookClient } from 'discord.js';
import { Client } from 'discordx';
import { schedule } from 'node-cron';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const notify = async () => {
  try {
    const webhook = new WebhookClient({
      id: String(process.env.WEBHOOK_ID),
      token: String(process.env.WEBHOOK_TOKEN)
    });
    console.log('Хук получен')
    schedule('* * * * *', async () => {
      await webhook.send(`@BPM, Го на дейлик! https://us04web.zoom.us/j/3845163874?pwd=MXVYZXRBWHBpOFlVQUNldlNCaVlhQT09, [123456]`);
    });
  } catch (error) {
    console.error('Error trying to send: ', error);
  }
}

export const bot = new Client({
  // To use only guild command
  // botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
  // Discord intents
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
  ],

  // Debug logs are disabled in silent mode
  silent: false,

  // Configuration for @SimpleCommand
  simpleCommand: {
    prefix: "!",
  },
});

bot.once("ready", async () => {
  // Make sure all guilds are cached
  // await bot.guilds.fetch();
  // TODO вернуть когда получу бот токен для форсайта
  //  await notify()
  // Synchronize applications commands with Discord
  await bot.initApplicationCommands();

  // To clear all guild commands, uncomment this line,
  // This is useful when moving from guild commands to global commands
  // It must only be executed once
  //
  //  await bot.clearApplicationCommands(
  //    ...bot.guilds.cache.map((g) => g.id)
  //  );

  console.log("Bot started");
});

bot.on("interactionCreate", (interaction: Interaction) => {
  bot.executeInteraction(interaction);
});

bot.on("messageCreate", (message: Message) => {
  bot.executeCommand(message);
});

async function run() {
  // The following syntax should be used in the commonjs environment
  //
  // await importx(__dirname + "/{events,commands}/**/*.{ts,js}");

  // The following syntax should be used in the ECMAScript environment
  // TODO вернуть когда получу бот токен для форсайта
  // await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);

  // // Let's start the bot
  // if (!process.env.BOT_TOKEN) {
  //   throw Error("Could not find BOT_TOKEN in your environment");
  // }
  // // Log in with your bot token
  // await bot.login(process.env.BOT_TOKEN);
  await notify()
}

run();
