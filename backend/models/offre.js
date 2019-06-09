var mongoose = require('mongoose')

Schema = mongoose.Schema

offreSchema = new Schema({
                            title: String,
                            link : String,
                            author: String,
                            content: String,
                            date: Date,
                            read: String,
                            insertion_date: Date
                        })
module.exports = mongoose.model('Offre', offreSchema)