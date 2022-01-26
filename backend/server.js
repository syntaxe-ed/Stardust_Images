process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var session = require('express-session');
const basicAuth = require('express-basic-auth');
const users = require('./models/users.model')
const bcrypt = require("bcrypt");

require('dotenv').config();

function shouldAuthenticate(req) {
  if (req.method === 'POST' && req.originalUrl !== '/auth/login') {
    return true;
  }
  return false;
}

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

async function getUsers() {
  let userAccounts = [];
  await users.find().then((users) => {
    for (const user of users){
      userAccounts.push({username: user.username, password: user.password});
    }
  })
  return userAccounts;
}

async function myAuth(username, password, cb) {
  let match = false;
  const users = await getUsers();
  for (const user of users) {
    const salt = await (user.password.substring(0, process.env.HASH_LENGTH));
    const hash = await bcrypt.hash(password, salt);
    match = basicAuth.safeCompare(username, user.username) && basicAuth.safeCompare(hash, user.password);
  }
  return cb(null, match);
}

app.use(cors());
app.use(express.json());

const basicAuthMiddleware = basicAuth({authorizer: myAuth, authorizeAsync: true});
app.use((req, res, next) => shouldAuthenticate(req) ? basicAuthMiddleware(req, res, next) : next());

const photosRouter = require('./routes/photos');
//const emailRouter = require('./routes/email');
const pagesRouter = require('./routes/pages');
const authRouter = require('./routes/auth');

app.use('/gallery', photosRouter);
app.use('/pages', pagesRouter);
app.use('/auth', authRouter);
// app.use('/send', emailRouter);
// app.use(session({
//   secret: '2C44-4D44-WppQ38S',
//   resave: true,
//   saveUninitialized: true
// }))

// app.get('/', function(req, res, next) {
//   console.log(req.session)
// })

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

