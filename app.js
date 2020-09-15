const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./src/db');

const createRandomsArticles = require('./src/endpoint/createRandomsArticles');

app.use(bodyParser.urlencoded({ extended: true }));
//TODO estudar esse cors
// app.use(cors())
app.use(bodyParser.json());

//TODO Talvez criar arquivo de rotas
app.post('/articles/random', createRandomsArticles);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(7000, ()=>{
  console.log("Server running in the port 7000");
});