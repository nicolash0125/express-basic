const { mongoUtils, dataBase } = require("../lib/utils/mongo.js");
const COLLECTION_NAME = "usuarios";
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function getUsers() {
  const client = await mongoUtils.conn();
  const users = await client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .find({})
    .toArray()
    .finally(() => client.close());
  return users;
}


async function loginUser(user,password) {
    const client = await mongoUtils.conn();
    const users = await client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .find({"usuario":user})
      .toArray()
      .finally(() => client.close());
    validate = false;
    console.log(users)
    bcrypt.compare(password, users[0]["pass"], function(err, result) {
        validate = result
    });
    return validate;
  }


function insertUser(user) {
  return mongoUtils.conn().then((client) => {
    bcrypt.hash(user.pass, saltRounds, function (err, hash) {
      // Store hash in your password DB.
      user.pass = hash;
      return client
        .db(dataBase)
        .collection(COLLECTION_NAME)
        .insertOne(user)
        .finally(() => client.close());
    });
  });
}

module.exports = [getUsers, insertUser];
