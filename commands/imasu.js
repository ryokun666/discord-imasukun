const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("imasu")
    .setDescription("参加通知を発信しますよ！"),
  async execute(interaction) {
    const username = interaction.user.username;
    await interaction.reply(
      `@everyone \n今日は${username}くんいるらしい。`
    );
  },
};
