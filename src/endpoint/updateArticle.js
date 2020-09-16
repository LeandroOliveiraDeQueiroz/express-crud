const articleService = require('../service/ArticleService');

function updateArticle(req, res) {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  articleService.update(req.params.id, req.body.title, req.body.body).then((resp)=>{
    res.status(200).send(resp);
  }).catch((e)=>{
    res.status(404).send(e);
  });
}

module.exports = updateArticle;