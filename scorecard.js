const request=require("request");
const cheerio=require("cheerio");
const mainObj=require('./filejson.js');
function processScorecard(url){
    request(url,(err,resp,html)=>{
        if(err){
            console.log("WRONG URL");
        }else{
            extracthtml(html);
        }
    });
}
//ipl(folder)-->teams(folder)-->player(file)
function extracthtml(html){
    let $=cheerio.load(html);
    //venue date result
    let venue_date=$('div.ds-text-tight-m.ds-font-regular.ds-text-typo-mid3').text();
    let result=$('.ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo').text();
    let venueDate=venue_date.split(",");//array
    // console.log(venueDate[1].trim(),venueDate[2].trim(),venueDate[3].trim());
    // console.log(result); 
    let both_innings=$('.ds-rounded-lg.ds-mt-2');
    //we have to find team->players->runs,balls,fours,sizes,sr,oppponent
    let statisics={};
    for(let i=0;i<both_innings.length;i++){
        let teamName=$(both_innings[i]).find('.ds-capitalize').text();
        let opponent_idx=(i===0)?1:0;
        let oppTeam=$(both_innings[opponent_idx]).find('.ds-capitalize').text();
        //console.log(`${venueDate[1].trim()},${venueDate[2].trim()}, ${result}, ${teamName.trim()}, ${oppTeam.trim()}`);
        let batsman_table=$(both_innings[i]).find('.ds-p-0>.ci-scorecard-table>tbody');
        let validrows=$(batsman_table).find('tr[class=""]');
        let stats_Array=[];
        for(let j=0;j<validrows.length;j++){//iterations for each row of batsman table
            let Name=$(validrows[j]).find('.ds-w-0.ds-items-center').text();
            let cols=$(validrows[j]).find('.ds-w-0.ds-text-right');
            let performance={};
            let str='';
            for(let k=0;k<cols.length;k++){//length = 6
                if($(cols[k]).hasClass('ds-hidden')===true){
                    continue;
                }
                str+=$(cols[k]).text()+" ";
                if(k==0)str='Runs';if(k==1)str='Balls';if(k==3)str='4s';if(k==4)str='6s';if(k==5)str='SR';
                performance[str]=$(cols[k]).text();
            }
            let ans_obj={Name,...performance};
            if(ans_obj.Name!==''){
                stats_Array.push(ans_obj);
            }
           
        }
        statisics[teamName]=stats_Array;
    }
    mainObj.fun(venueDate[2].trim(),venueDate[1].trim(),result,statisics);
    
}
module.exports={
    ps:processScorecard
}