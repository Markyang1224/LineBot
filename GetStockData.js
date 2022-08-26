const axios = require("axios");
const cheerio = require("cheerio");

async function GetStockData(code) {
  try {
    const res = await axios.get(`https://tw.stock.yahoo.com/quote/${code}`);
    const $ = cheerio.load(res.data);
    const AllData = {}; // 存放所有數值
    const key = [
      "name",
      "code",
      "deal",
      "start",
      "highest",
      "lowest",
      "yesterday",
      "upordown",
    ];
    // name 所在的div;
    const selector =
      "#main-0-QuoteHeader-Proxy > div > div.D\\(f\\).Ai\\(c\\).Mb\\(6px\\)";
    $(selector)
      .children()
      .each((idx, elem) => {
        if (idx <= 1) {
          AllData[key[idx]] = $(elem).text();
        }
      });

    //Data1
    // const DataSelector =
    //   "#main-0-QuoteHeader-Proxy > div > div.D\\(f\\).Jc\\(sb\\).Ai\\(fe\\) > div.D\\(f\\).Fld\\(c\\).Ai\\(fs\\) > div";
    // $(DataSelector)
    //   .children()
    //   .each((idx, elem) => {
    //     console.log(idx);
    //     console.log($(elem).text());
    //   });

    //Data 所在的div
    const DataSelector =
      "#qsp-overview-realtime-info > div:nth-child(2) > div.Fx\\(n\\).W\\(316px\\).Bxz\\(bb\\).Pstart\\(16px\\).Pt\\(12px\\) > div > ul";

    let keyidx = 2; //前面兩項已經填name的部分了
    $(DataSelector)
      .children()
      .each((paridx, parelem) => {
        if (paridx <= 3 || paridx == 6) {
          $(parelem)
            .children()
            .each((childidx, childelem) => {
              if (childidx == 1) {
                //index = 0為中文 只需存index = 1的數值
                AllData[key[keyidx]] = $(childelem).text();
                keyidx++;
              }
            });
        }
      });

    //計算漲跌
    AllData[key[keyidx]] = (
      Math.floor((AllData.deal - AllData.yesterday) * 1000) / 1000
    ).toString();

    return AllData;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = GetStockData;
