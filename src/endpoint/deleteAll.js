
const articleService = require('../service/ArticleService');
const userService = require('../service/UserService');

function deleteAll(req, res) {
  userService.deleteAll().then((userResponse)=>{
    articleService.deleteAll().then((articleResponse)=>{
      res.status(200).send({userResponse, articleResponse});
    }).catch((e)=>{
      res.status(400).send(e);
    });
  }).catch((e)=>{
    res.status(400).send(e);
  });
  
}

module.exports = deleteAll;