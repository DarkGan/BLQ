module.exports = {
  name: "invite",
  description: "Отправить ссылку для приглашения бота  ",
  execute(message) {
    return message.member
      .send(
        `https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=70282305&scope=bot
    `
      )
      .catch(console.error);
  }
};
