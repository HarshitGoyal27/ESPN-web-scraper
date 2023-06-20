const cheerio = require("cheerio");
const request = require("request");
const allMatchobj = require("./allMatch");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
request(url, (err, resp, html) => {
  if (err) {
    console.log("URL IS INVALID");
  } else {
    extractHTML(html);
  }
});
function extractHTML(html) {
  //STEP1:GO TO ALL MATCHES(VIEW ALL RESULTS)
  let $ = cheerio.load(html);
  let link = $(".ds-block>div>.ds-border-t>a");//view all results
  let allmatches = $(link).attr("href");//extracting the link 
  allmatches = "https://www.espncricinfo.com" + allmatches;//next page
  allMatchobj.AllMatch(allmatches);
}

