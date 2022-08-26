const linebot = require("linebot");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
dotenv.config();
const GetStockData = require("./GetStockData");

const bot = linebot({
  channelId: process.env.CHANNELID,
  channelSecret: process.env.CHANNELSECRET,
  channelAccessToken: process.env.CHANNELACCESSTOKEN,
});

//當觸發webhook event時, 會自動執行
bot.on("message", async (event) => {
  let Data = await GetStockData(event.message.text); // 抓資料
  // event.message.text
  if (Data == null) {
    event.reply("Can't find the data , Please type the correct code");
  } else {
    event
      .reply(
        `名稱: ${Data.name}\n代號: ${Data.code}\n成交: ${Data.deal}\n開盤: ${Data.start}\n最高: ${Data.highest}\n最低: ${Data.lowest}\n昨日收盤: ${Data.yesterday}\n漲跌: ${Data.upordown}`
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
