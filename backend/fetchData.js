const cheerio = require('cheerio');
const moment = require('moment')
let offresArr= [];

exports.fetchDataFromWeb = (body) => {
    console.log('entered in the fetchdata function')
   
   let arr_info = [];
   let $ = cheerio.load(body); 
   
   $('body > article').each(function(index){
       
       
         
       const link = $(this).find('div.post-title>a').attr('href'); 
       const title = $(this).find('div.post-title').text(); 
       const info = $(this).find('div.post-infos').text();
       const content = $(this).find('div.content').text();
       arr_info = info.split("•");
       
       const obj = { 
           link : link, 
           title : title,
           author: arr_info[0],
           content : content,
           date : formatDate(arr_info[2]),
           read : arr_info[3]
       }; 
                   
      offresArr.push(obj);
       
   }); 
   
 
   return offresArr;
   
};

function formatDate(date){
    //delete days from the date
    
    let simpleDate = date.split(" ")[2];
    
    return moment(simpleDate , 'DD/MM/YYYY');
    
    }