const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "remove",
  aliases: ["rm"],
  description: "Удалить песню из очереди",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Нет очереди.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`Применение : ${message.client.prefix}удалять <Номер очереди:>`);
    if (isNaN(args[0])) return message.reply(`Применение : ${message.client.prefix}удалять <Номер очереди:>`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} ❌ удалено **${song[0].title}** из очереди.`);
  }
};
