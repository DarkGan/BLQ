module.exports = {
  name: "ping-bot",
  cooldown: 10,
  description: "Показать средний пинг бота",
  execute(message) {
    message.reply(`📈 Средний пинг до API  : ${Math.round(message.client.ws.ping)} ms`).catch(console.error);
  }
};
