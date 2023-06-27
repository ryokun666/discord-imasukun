// hey.jsのmodule.exportsを呼び出します。
const heyFile = require("./commands/hey.js");
const imasuFile = require("./commands/imasu.js");
const imasenFile = require("./commands/imasen.js");

const commands = [heyFile, imasuFile, imasenFile];

// discord.jsライブラリの中から必要な設定を呼び出し、変数に保存します
const {
  REST,
  Routes,
  Client,
  Events,
  GatewayIntentBits,
} = require("discord.js");

// 環境変数としてapplicationId, guildId, tokenの3つが必要です
const { applicationId, guildId, token } = require("./config.json");

// クライアントインスタンスと呼ばれるオブジェクトを作成します
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// DiscordのAPIには現在最新のversion10を指定
const rest = new REST({ version: "10" }).setToken(token);

// Discordサーバーにコマンドを登録
(async () => {
  try {
    const body = commands.map((command) => command.data.toJSON());
    rest.put(Routes.applicationGuildCommands(applicationId, guildId), {
      body: body,
    });
    console.log("サーバー固有のコマンドとして登録されました！");
  } catch (error) {
    console.error("コマンドの登録中にエラーが発生しました:", error);
  }
})();

// クライアントオブジェクトが準備OKとなったとき一度だけ実行されます
client.once(Events.ClientReady, (c) => {
  console.log(`準備OKです! ${c.user.tag}がログインします。`);
});

//スラッシュコマンドに応答するには、interactionCreateのイベントリスナーを使う必要があります
client.on(Events.InteractionCreate, async (interaction) => {
  // スラッシュ以外のコマンドの場合は対象外なので早期リターンさせて終了します
  // コマンドにスラッシュが使われているかどうかはisChatInputCommand()で判断しています
  if (!interaction.isChatInputCommand()) return;

  // heyコマンドに対する処理
  try {
    
    commands.map((commandFile) => {
      if (interaction.commandName === commandFile.data.name) {
        runCommand(commandFile, interaction);
      }
    });
  } catch {
     console.error(
       `${interaction.commandName}というコマンドには対応していません。`
     );
  }

});

// ログインします
client.login(token);

async function runCommand(commandFile, interaction) {
  try {
    await commandFile.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "コマンド実行時にエラーになりました。",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "コマンド実行時にエラーになりました。",
        ephemeral: true,
      });
    }
  }
}
