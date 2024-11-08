const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "skipto",
  aliases: ["st"],
  description: "Перейти к выбранному номеру очереди",
  execute(message, args) {
    if (!args.length || isNaN(args[0]))
      return message
        .reply(`Применение: ${message.client.prefix}${module.exports.name} <Номер очереди>`)
        .catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Нет очереди.").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    if (args[0] > queue.songs.length)
      return message.reply(`Очередь только  ${queue.songs.length} песни длинные!`).catch(console.error);

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }

    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ пропущено ${args[0] - 1} песни`).catch(console.error);
  }
};
