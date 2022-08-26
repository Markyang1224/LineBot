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

//當觸發webhook event時, 會自動執行
bot.on("message", async (event) => {
  let Data = await getdata(event.message.text);
  // event.message.text
  if (!Data) {
    event.reply("Can't find the data");
  } else {
    event
      .reply(
        `代號: ${Data.Code}\n名稱: ${Data.Name}\n交易量: ${Data.TradeVolume}\n開盤價: ${Data.OpeningPrice}\n最高價: ${Data.HighestPrice}\n最低價: ${Data.LowestPrice}\n收盤價: ${Data.ClosingPrice}`
      )
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      });
  }
});

bot.listen("/linewebhook", 3000, () => {
  console.log("Bot is ready");
});
