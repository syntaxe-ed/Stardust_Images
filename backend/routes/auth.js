const router = require('express').Router();
const users = require('../models/users.model')
const bcrypt = require("bcrypt");
const basicAuth = require('express-basic-auth');

async function getUsers() {
    let userAccounts = [];
    await users.find().then((users) => {
      for (const user of users){
        userAccounts.push({username: user.username, password: user.password});
      }
    })
    return userAccounts;
  }
  
  async function myAuth(username, password) {
    let match = false;
    const users = await getUsers();
    for (const user of users) {
      const salt = await (user.password.substring(0, process.env.HASH_LENGTH));
      const hash = await bcrypt.hash(password, salt);
      match = basicAuth.safeCompare(username, user.username) && basicAuth.safeCompare(hash, user.password);
    }
    console.log(match);
    return match;
  }

router.route('/login').post(async (req, res) => {
  try {
    if (await myAuth(req.body.username, req.body.password)) {
      const token = `${Buffer.from(req.body.username + ':' + req.body.password).toString('base64')}`;
      console.log(token);
      res.json({token});
    } else {
      res.sendStatus(401);
    }
  } catch {
    res.sendStatus(401);
  } 
})

module.exports = router;