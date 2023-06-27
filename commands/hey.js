// SlashCommandBuilder という部品を discord.js からインポートしています。
const { SlashCommandBuilder } = require("discord.js");

// 以下の形式にすることで、他のファイルでインポートして使用できるようになります。
module.exports = {
  data: new SlashCommandBuilder()
    .setName("kontya")
    .setDescription("元気よくいますくんがあいさつします！"),
  execute: async function (interaction) {
    await interaction.reply("こんちゃー！");
  },
};
