const fs = require('fs');
const axios = require('axios');

function init(param)
{
    if (param === "--out"){
        if(process.argv[4].slice(0, 7).toLowerCase() === 'http://') webCat(process.argv[4], process.argv[3]);
        else cat(process.argv[4], process.argv[3]);
    }

    else if(param.slice(0, 7).toLowerCase() === 'http://') webCat(param);
    else cat(param);
    //console.log(param.slice(0, 7).toLowerCase());
}

function cat(path, file){
    fs.readFile(path, 'utf8', function(err,data){
        if (err){
            console.log("error: ", err);
            process.exit(1);
        }
        if (file) fs.writeFile(file, data, 'utf8', (err) => {
            if(err){
                console.log("There was an error"); 
                process.exit(1);
            } 
        })
        else console.log(data);
    })
}


async function webCat(url, file){
    try{
        let content = await axios.get(url);
        if (file) fs.writeFile(file, content.data, 'utf8', (err) => {
            if(err){
                console.log("There was an error"); 
                process.exit(1);
            } 
        })
        else console.log(content.data);
    }
    catch (err) {
        console.log("That page doesn't exist, or is down.");
    }
}

init(process.argv[2]);