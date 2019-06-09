
const Axios = require('axios');
const fetchData = require ('../fetchData.js')
const URL = "https://www.anpe-mali.org/appels-doffres/";
const moment = require('moment')


var DataFromDB;
var newOffres = [];
var isDataNew = true;
var index = 0;


       


        Axios.get(URL)
        .then((response) => {
            if (response.status === 200){
                const body = response.data;
                const DataFromWeb =  fetchData.fetchDataFromWeb(body)
                

                while(isDataNew){
                    console.log(isDataNew)
                   
                    if(DataFromWeb[index].content === DataFromDB[index].content){
                        isDataNew = false;
                    }
                    else{
                      
                        Offre.create({
                                        title: DataFromWeb[index].title,
                                        link: DataFromWeb[index].link,
                                        author: DataFromWeb[index].author,
                                        content: DataFromWeb[index].content,
                                        date: DataFromWeb[index].date,
                                        read: DataFromWeb[index].read,
                                        insertion_date: moment()
                
                        },(error, offre) => {
                            if(error) return console.log(error);
                            
                        })
                    }
                    index++;
                }
                
            }
            
    
        }, (error) => console.log(error));
        

        Offre.find({})
        .sort('-date')
        .limit(30)
        .select('-_id')
        .exec((error, offres) => {
            if(error)return console.log(error);
           
               DataFromDB = offres;
                             
                });

              

