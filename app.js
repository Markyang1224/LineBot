const linebot = require("linebot");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
dotenv.config();
const getdata = require("./GetData");

const bot = linebot({
  channelId: process.env.CHANNELID,
  channelSecret: process.env.CHANNELSECRET,
  channelAccessToken: process.env.CHANNELACCESSTOKEN,
});

bot.on("message", async (event) => {
  let res = await getdata(event.message.text);
  // event.message.text
  if (res == null) {
    event.reply("Can't find the data");
  } else {
    event
      .reply(res)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

bot.listen("/linewebhook", 3000, () => {
  console.log("Bot is ready");
});
