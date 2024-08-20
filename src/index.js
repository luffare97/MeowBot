
require('dotenv').config();
const { Client, IntentsBitField, ChatInputCommandInteraction, InteractionResponse, Events } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,

  ],
});

//tells us its online
client.on('ready', (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
});


//answer meow messages
client.on('messageCreate', (message) => {

  if (message.author.bot) {
    return;
  }
  if (message.content === 'meow') {
    message.reply('Meow Meow');
  }

});

//Adding roles from buttons and slash commands
client.on('interactionCreate', async (interaction) => {

  try {


    if (interaction.isButton()) {


      await interaction.deferReply({ ephemeral: true });

      const role = interaction.guild.roles.cache.get(interaction.customId);
      if (!role) {
        interaction.editReply({
          content: "I couldn't find that role",

        })
        return;

      }

      const hasRole = interaction.member.roles.cache.has(role.id);

      if (hasRole) {
        await interaction.member.roles.remove(role);
        await interaction.editReply(`The role ${role} has been removed.`);
        return;
      }

      await interaction.member.roles.add(role);
      await interaction.editReply(`The role ${role} has been added.`);
    }
  } catch (error) {
    console.log(error);
  }


  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'hey') {
    interaction.reply('Meowdy 🤠')
  }
  if (interaction.commandName === 'ping') {
    interaction.reply('Pawng 🐾')
  }

})

client.on(Events.GuildMemberAdd, async (member) => {
  const role = "1152327062892314626"//put the role id in here
  const giveRole = await member.guild.roles.cache.get(role);  

  member.roles.add(giveRole);
})



client.login(process.env.TOKEN);
