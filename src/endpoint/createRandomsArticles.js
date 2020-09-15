
const articleService = require('../service/ArticleService');
const userService = require('../service/UserService');

const fetch = require('node-fetch');
const fakeDataURL = 'https://my-json-server.typicode.com/LeandroOliveiraDeQueiroz/dartware-avalicao-tecnica/db';

function createRandomsArticles(req, res) {

    fetch(fakeDataURL, {
        method: "GET", 
        headers: {"Content-Type": "application/json;"}
    }).then((result) => {
        result.json().then((fakeData) => {
            userService.saveBulk(fakeData.users).then((users) => {
                articleService.saveBulk(fakeData.articles, raffleUsers(users, 20)).then((articles) => {
                    res.status(201).send(articles);
                }).catch((e)=>{
                    res.status(400).send(e);
                });
            }).catch((e)=>{
                res.status(400).send(e);
            });
        }).catch((e) => {
            res.status(400).send(e);
        });
    }).catch((e)=>{
        res.status(400).send(e);
    });
}

function raffleUsers(users, raffleNumber){
    let raffleUsers = [];
    for(var i = 0; i < raffleNumber; i++){
        raffleUsers.push(users[Math.round(Math.random() * 10)]);
    }
    return raffleUsers;
}


module.exports = createRandomsArticles;