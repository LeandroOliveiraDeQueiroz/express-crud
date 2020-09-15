const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const db = require('./src/db');

app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(7000, ()=>{
  console.log("Server running in the port 7000");
});