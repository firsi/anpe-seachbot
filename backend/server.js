const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4000;
const request = require('request'); 
const cheerio = require('cheerio'); 
const Axios = require('axios')

app.use(cors());
  
const URL = "https://www.anpe-mali.org/appels-doffres/"; 
const offresArray = [];   


app.get('/',(req, res) => {

    res.send('server running on port 5000');                
})

app.get('/api/appels-doffres', (req, res) => {

    Axios.get(URL)
    .then((response) => {
        if (response.status === 200){
            const body = response.data;

            
            
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
                    author: arr_info[0],
                    content : content,
                    date : arr_info[2],
                    read : arr_info[1]
                }; 
                            
                
                offresArray.push(obj); 
                }
            }); 
            
            res.json({offres: offresArray});

        }


    }, (error) => console.log(error));
               // res.send("done");
})
app.listen(PORT, function(){
    console.log('Server is running on Port: '+ PORT );
})