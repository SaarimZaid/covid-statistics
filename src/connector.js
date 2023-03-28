//const mongodb = require('mongodb');
// HPEjVuIhFuIbAOhf
// const mongoURI = "mongodb://localhost:27017" + "/covidtally"
const mongoURI = "mongodb+srv://saarimzaid:HPEjVuIhFuIbAOhf@covid-statistics.pordf55.mongodb.net/test?authSource=covid-statistics&authMechanism=SCRAM-SHA-1"

let mongoose = require('mongoose');
const { tallySchema } = require('./schema')


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connection established with mongodb server online"); })
    .catch(err => {
        console.log("error while connection", err)
    });
collection_connection = mongoose.model('covidtally', tallySchema)


exports.connection = collection_connection;
