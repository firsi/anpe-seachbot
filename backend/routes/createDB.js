const cheerio = require('cheerio'); 
const Axios = require('axios')
const moment = require ('moment')
module.exports = function(app) {
    const URL = "https://www.anpe-mali.org/appels-doffres/";

    app.get('/api/appels-doffres', (req, res) => {
        var offresArray = [];
        
        
        Axios.get(URL)
        .then((response) => {
            if (response.status === 200){
                const body = response.data;
    
                
                
                let arr_info = [];
                let $ = cheerio.load(body); 
                
                $('body > article').each(function(index){
                    
                    
                      
                    const link = $(this).find('div.post-title>a').attr('href'); 
                    const title = $(this).find('div.post-title').text(); 
                    const info = $(this).find('div.post-infos').text();
                    const content = $(this).find('div.content').text();
                    arr_info = info.split("•");
                    
                   /* const obj = { 
                        link : link, 
                        title : title,
                        author: arr_info[0],
                        content : content,
                        date : "blu",
                        read : arr_info[3]
                    }; */
                                
                    Offre.create({
                        title:title,
                        link:link,
                        author:arr_info[0],
                        content:content,
                        date: formatDate(arr_info[2]),
                        read:arr_info[3]


        },(error, Offre) => {if(error)return console.log(error)})
                    
                    
                }); 
                
              
    
            }
            
    
        }, (error) => console.log(error));
                   // res.send("done");
    })

}

function formatDate(date){
//delete days from the date

let simpleDate = date.split(" ")[2];

return moment(simpleDate , 'DD/MM/YYYY');

}