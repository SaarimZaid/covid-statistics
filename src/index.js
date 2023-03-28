const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const refreshAll = require('./createDatabase')
refreshAll()

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const tallySchema = require('./schema')
const { connection } = require('./connector')

app.get('/totalrecovered', async (req,res)=>{
    try {
        const data = await connection.find();
        let recovered = 0;
        for (i = 0; i < data.length; i++) {
            recovered += data[i].recovered
        }
        // console.log(recovered)
        res.status(200).json({
            data: { _id: "recovered", recovered: recovered },

        })
    } catch (error) {
        res.status(500).json({
            sta: "failed",
            message: error.message
        })
    }
})

app.get('/totalactive', async (req,res)=>{
    try {
        const data = await connection.find();
        let infected = 0;
        for (i = 0; i < data.length; i++) {
            infected += data[i].infected
        }
        console.log(infected)
        res.status(200).json({
            data: { _id: "infected", infected: infected },

        })
    } catch (error) {
        res.status(500).json({
            sta: "failed",
            message: error.message
        })
    }
})

app.get('/totaldeath', async (req,res)=>{
    try {
        const data = await connection.find();
        let death = 0;
        for (i = 0; i < data.length; i++) {
            death += data[i].death
        }
        // console.log(death)
        res.status(200).json({
            data: { _id: "death", death: death },

        })
    } catch (error) {
        res.status(500).json({
            sta: "failed",
            message: error.message
        })
    }
})

app.get('/hotspotstates', async (req, res)=>{
    try {
        let data = await connection.find()
        let infected;
        let recovered;
        let hotspotstate = [];
        for(let i=0; i<data.length; i++){
            infected = data[i].infected;
            recovered = data[i].recovered;
            let rateValue = (infected-recovered)/infected;
            if(rateValue > 0.1){
                rateValue = rateValue.toFixed(5)

                hotspotstate.push({State: data[i].state, Rate: rateValue})
            }
        }
        res.json({hotspotstate})
    }
    catch(err) {
        res.status(422).json({err:'data not found'})
    }
})

app.get('/healthystates', async (req, res)=>{
    try{
        let data = await connection.find()
        let death;
        let infected;
        let healthystates = [];
        for(let i=0; i<data.length; i++){
            death = data[i].death;
            infected = data[i].infected;
            let mortality = death/infected;
            if(mortality < 0.005){
                mortality = mortality.toFixed(5)
                healthystates.push({State: data[i].state, Mortality: mortality})
            }
        }
        res.json({healthystates})
    }catch(err) {
        res.status(422).json({err:'data not found'})

    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;