moment = require('moment')
const Data = require('../fetchData.js');
const URL = "https://www.anpe-mali.org/appels-doffres/";
module.exports = function(app) {


    app.get('/api/offres',(req, res) => {
        var customOffre=[];
        Offre.find({})
        .sort('-date -insertion_date')
        .limit(30)
        .select('-_id')
        .exec((error, offres) => {
            if(error)return console.log(error);
            moment.locale('fr')
            offres.forEach(element => {
               
                customOffre.push({
                        title: element.title,
                        link:element.link,
                        author:element.author,
                        content:element.content,
                        date: moment(element.date).format("dddd DD/MM/YYYY"),
                        read:element.read

                })
            });
            res.json({offres: customOffre});
        })
        console.log("calling function fetch");
        Data.fetchDataFromWeb(URL);
    })
}