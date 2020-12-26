const fs = require("fs");
let config;

try {
  config = require("../config.json");
} catch (error) {
  config = null;
}

module.exports = {
  name: "pruning",
  description: "Переключить удаление сообщений бота",
  execute(message) {
    if (!config) return;
    config.PRUNING = !config.PRUNING;

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.log(err);
        return message.channel.send("При записи в файл произошла ошибка.").catch(console.error);
      }

      return message.channel
        .send(`Удаление сообщений  ${config.PRUNING ? "**включен**" : "**отключен**"}`)
        .catch(console.error);
    });
  }
};
