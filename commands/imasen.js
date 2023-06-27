const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("imasen")
    .setDescription("不参加参加通知を発信しますよ！"),
  async execute(interaction) {
    const username = interaction.user.username;
    console.log(interaction);
    await interaction.reply(
      `@everyone \n今日は${username}くんいないらしいよ。`
    );
  },
};
