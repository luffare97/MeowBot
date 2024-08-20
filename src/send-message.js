require('dotenv').config();
const { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,

  ],
});

const roles = [
  {
    id: '1160223158884913203',
    label: 'Overwatch'
  },
  {
    id: '1160224542954901685',
    label: 'Genshin Impact'
  },
  {
    id: '1160227935425400862',
    label: 'Leagus of Legends'
  },
  {
    id: '1160225287758430309',
    label: 'Minecraft'
  },
  {
    id: '1160226747313299466',
    label: 'BaldursGate'
  },

]

//choose channel to post message in
client.on('ready', async (c) => {
  try {
    const channel = await client.channels.cache.get('1148592333537951854');
    if(!channel) return;

    const row = new ActionRowBuilder();

    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
      )
    });

    await channel.send({
      content: 'Claim or remove a role bellow',
      components: [row],
    });

    process.exit();

  } catch (error) {
    console.log(error);
  }
});


client.login(process.env.TOKEN);