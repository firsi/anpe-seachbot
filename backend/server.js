const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4000;
const request = require('request'); 
const cheerio = require('cheerio'); 
 

app.use(cors());
  
const URL = "https://www.anpe-mali.org/appels-doffres/"; 
const arr = [];   


app.get('/',(req, res) => {

    res.send('server running on port 5000');                
})

app.get('/api/appels-doffres', (req, res) => {
    request(URL, function (err, res, body) { 
        if(err) 
        { 
            console.log(err); 
        } 
        else
        { 
            
            let date="";
            let arr_info = [];
            let $ = cheerio.load(body); 
            
            $('body > article').each(function(index){
                
                if(index < 50){
                  
                const link = $(this).find('div.post-title>a').attr('href'); 
                const title = $(this).find('div.post-title').text(); 
                const info = $(this).find('div.post-infos').text();
                const content = $(this).find('div.content').text();
                arr_info = info.split("•");
                const obj = { 
                    link : link, 
                    title : title,
                    content : content,
                    date : arr_info[2]
                }; 
                            
                console.log(obj);
                arr.push(obj); 
                }
            }); 
            
            
            
        } 
    }); 
    res.json(arr);
})
app.listen(PORT, function(){
    console.log('Server is running on Port: '+ PORT );
})