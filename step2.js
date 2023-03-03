const fs = require('fs');
const axios = require('axios');

function init(param)
{
    if(param.slice(0, 7).toLowerCase() === 'http://') webCat(param);
    else cat(param);
    //console.log(param.slice(0, 7).toLowerCase());
}

function cat(path){
    fs.readFile(path, 'utf8', function(err,data){
        if (err){
            console.log("error: ", err);
            process.exit(1);
        }
        console.log(data);
    })
}


async function webCat(url){
    try{
        let content = await axios.get(url);
        console.log(content.data);
    }
    catch (err) {
        console.log("That page doesn't exist, or is down.");
    }
}

init(process.argv[2]);