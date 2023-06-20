const fs=require('fs')
function fun(Date,Venue,Result,Statistics){
    let obj={Date,Venue,Result,Statistics};
    try{
        let fileData=fs.readFileSync('./Example.json');//buffer data
        //conver to javascript object
        let fileobj=JSON.parse(fileData);
        fileobj.push(obj);
        let str=JSON.stringify(fileobj);
        fs.writeFileSync('./Example.json',str);
    }
    catch(err){
        let arr=[];
        arr.push(obj);
        let str=JSON.stringify(arr);
        fs.writeFileSync('./Example.json',str);
    }
}
module.exports={fun};