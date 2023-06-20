const request = require("request");
const cheerio = require("cheerio");
const scoreCardobj=require("./scorecard");
function goToallpage(allmatches){
  request(allmatches, (err, resp, html) => {
    if (err) {
      console.log("URL NOT FOUND2");
    }
    else{
        getAllMatchesLink(html);
    }
  });
}
let count=1;
//ALL MATCHES PAGE
function getAllMatchesLink(html) {
  //STEP 2:GET ALL MATCHES LINK(DO FOR 1,AUTOMATICALLY OTHERS WOULD GET RESOLVED)
  let $ = cheerio.load(html);
  let allDetailedScoreCard = $('.ds-mb-4>div>div>.ds-p-0>div>.ds-flex>.ds-grow>a[class="ds-no-tap-higlight"]'); //link of all 60 matches
  let value = "https://www.espncricinfo.com";
  //revise this part most importantly coz of prev mistake
  let clicks = [];
  for (let i = 0; i < allDetailedScoreCard.length; i++) {
    clicks.push(value + $(allDetailedScoreCard[i]).attr("href"));
    //console.log(clicks[i]);
    scoreCardobj.ps(clicks[i]);//60 times call
  }
}
module.exports={
  AllMatch:goToallpage,
}