const articleService = require('../service/ArticleService');

function getArticle(req, res){
  let title = req.query.title;

  articleService.get(title).then((article)=>{
    if (!article || article.length === 0) {
      res.status(404).send({error: 'Article not found'});
    } else{
      res.status(200).send(article);
    }
  }).catch((e)=>{
    res.status(400).send(e);
  });

}

module.exports = getArticle;