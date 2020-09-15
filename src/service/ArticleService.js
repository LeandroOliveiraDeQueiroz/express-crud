const Article = require('../model/article');

class ArticleService {

  saveBulk(articles, users) {
    return new Promise((resolve, reject) => {
      let promises = [];

      articles.forEach((article, i)=>{
        promises.push(this.save(article, users[i]));
      });

      Promise.all(promises).then((savedArticles)=>{
        resolve(savedArticles);
      }).catch((e)=>{
        console.log(e);
        reject(e);
      });
    });
  }

  save(articleData, user){
    return new Promise((resolve, reject) => {
      const article = new Article(articleData);
      
      if(!article) {
        reject();
      }

      article.author = user._id;

      article.save().then(()=>{
        article.populate('author').execPopulate().then((art)=>{
          resolve(art);
        }).catch((e)=>{
          reject(e)
        });
      }).catch((e)=>{
        reject(e);
      });
    });
  }
}

module.exports = new ArticleService();