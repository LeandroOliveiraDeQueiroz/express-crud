const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./src/db');
const cors = require('cors');

const createRandomsArticles = require('./src/endpoint/createRandomsArticles');
const deleteAll = require('./src/endpoint/deleteAll.js');
const updateArticle = require('./src/endpoint/updateArticle.js');
const getArticle = require('./src/endpoint/getArticle.js');

app.use(bodyParser.urlencoded({ extended: true }));
//TODO estudar esse cors
app.use(cors());
app.use(bodyParser.json());

//TODO Talvez criar arquivo de rotas
app.post('/articles/random', createRandomsArticles);
app.delete('/articles/all', deleteAll);
app.put('/article/:id', updateArticle);
app.get('/getArticle', getArticle);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(7000, ()=>{
  console.log("Server running in the port 7000");
});