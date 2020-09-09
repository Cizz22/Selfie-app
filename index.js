const express = require('express');
const app = express();
const fs = require('fs');
const Datastore = require('nedb');

const port = process.env.PORT  || 3000;
app.listen(port, () => console.log('listening 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}))

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api', (req,res) => {
    const data = req.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    res.json(data);
});

app.get('/api' ,(req,res) => {
    database.find({}, (err,data) => {
        if(err){
            res.end()
            return;
        }
        res.json(data); 
    })
    
});