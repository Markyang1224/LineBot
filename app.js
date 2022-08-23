const linebot = require("linebot");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
dotenv.config();

const bot = linebot({
  channelId: process.env.CHANNELID,
  channelSecret: process.env.CHANNELSECRET,
  channelAccessToken: process.env.CHANNELACCESSTOKEN,
});

bot.on("message", (event) => {
  event
    .reply("Hello你剛剛說的是: " + event.message.text)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

bot.listen("/linewebhook", 3000, () => {
  console.log("Bot is ready");
});
