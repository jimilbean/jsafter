const request = require('request');
const iconv = require('iconv-lite');
const charset = require('charset');
const cheerio = require('cheerio');

module.exports = function(date, callback){
    const options = {
        url :"http://y-y.hs.kr/lunch.view?date=" + date,
        headers : {
            'User-Agent':'Mozilla/5.0'
        },
        encoding:null
    };
    request(options, function(err, res, body){
        const enc = charset(res.headers, body);
    
        const result = iconv.decode(body, enc);
        
        $ =  cheerio.load(result);
    
        let menu = $(".menuName > span");
        console.log(menu.text());
        callback(menu.text());
    });
}

