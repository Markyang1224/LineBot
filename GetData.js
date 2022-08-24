const axios = require("axios");

async function getdata(code) {
  const res = await axios.get(
    "https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL"
  );
  const Data = res.data;
  for (let i = 0; i < Data.length; i++) {
    if (code == Data[i].Code) {
      return Data[i].Name;
    }
  }

  return null;
}

module.exports = getdata;
