const User = require('../model/User');

class UserService {

  saveBulk(users) {
    return new Promise((resolve, reject) => {
      let promises = [];

      users.forEach((user)=>{
        promises.push(this.save(user));
      });

      Promise.all(promises).then((savedUsers)=>{
        resolve(savedUsers);
      }).catch((e)=>{
        console.log(e);
        reject(e);
      });
    });
  }

  save(userData){
    return new Promise((resolve, reject) => {
      const user = new User(userData);
      
      if(!user) {
        reject();
      }

      user.save().then(() => {
        resolve(user);
      }).catch((e) => {
        reject(e);
      });

    });
  }

}

module.exports = new UserService();
