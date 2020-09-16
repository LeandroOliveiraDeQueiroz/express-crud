const Article = require('../model/Article');

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

  deleteAll(){
    return new Promise((resolve, reject)=>{
      Article.deleteMany().then((res)=>{
        resolve(res);
      }).catch((e)=>{
        reject(e);
      });
    });
  }

  update(id, title, body){
    return new Promise((resolve, reject)=>{
      Article.findOne({_id: id}).then((article)=>{
        article.title = title;
        article.body = body;

        article.save().then(() => {
          resolve({
            success: true,
            id: article._id,
            message: 'Article updated!',
          });
        }).catch((e) => {
          reject({e, message: 'Article not updated!'});
        });
      }).catch((e)=>{
        reject({e, message: 'Article not found!'});
      });
    });
  }
  
}

module.exports = new ArticleService();