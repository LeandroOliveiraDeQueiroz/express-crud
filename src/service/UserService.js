const User = require("../model/User");

class UserService {
  async saveBulk(users) {
    return new Promise(async (resolve, reject) => {
      let promises = [];

      const session = await User.startSession();

      session.startTransaction();

      // Use for and not forEach:
      // https://stackoverflow.com/questions/70979039/node-js-foreach-loop-inside-try-catch-block
      // save to save one, create can save a array sending a bunch of saves.
      try {
        for (var i = 0; i < users.length; i++) {
          // if (i === 10) {
          //   throw "Erro forçado";
          // }
          await User.create([users[i]], { session });
        }

        console.log("commit transacation");
        await session.commitTransaction();
      } catch (error) {
        console.log("abort transacation", error);
        await session.abortTransaction();
      }
      // await session.withTransaction(() => {
      //   return User.create(users, { session });
      // });

      session.endSession();
      resolve(null);

      // Promise.all(promises).then((savedUsers)=>{
      //   resolve(savedUsers);
      // }).catch((e)=>{
      //   console.log(e);
      //   reject(e);
      // });
    });

    // return new Promise((resolve, reject) => {
    //   let promises = [];

    //   users.forEach((user)=>{
    //     promises.push(this.save(user));
    //   });

    //   Promise.all(promises).then((savedUsers)=>{
    //     resolve(savedUsers);
    //   }).catch((e)=>{
    //     console.log(e);
    //     reject(e);
    //   });
    // });
  }

  save(userData) {
    return new Promise((resolve, reject) => {
      const user = new User(userData);

      if (!user) {
        reject();
      }

      user
        .save()
        .then(() => {
          resolve(user);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  deleteAll() {
    return new Promise((resolve, reject) => {
      User.deleteMany()
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

module.exports = new UserService();
