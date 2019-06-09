const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4000;
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const cron = require('node-cron')

app.use(cors());
  
 const MONGO_CONNECTION = "mongodb+srv://firsi:firsi1234@cluster0-fdrjt.mongodb.net/test?retryWrites=true&w=majority"
 mongoose.connect(MONGO_CONNECTION, {useNewUrlParser: true})

 Offre = require('./models/offre.js')


//Automated task on db
cron.schedule("0 0 * * * *", () => {
    require('./lib/UpdateDb.js')
})


//routes

require('./routes/createDB.js')(app)/*this is run once for initial saving of the Db*/
require('./routes/retrieveOffre.js')(app)


app.listen(PORT, function(){
    console.log('Server is running on Port: '+ PORT );
})