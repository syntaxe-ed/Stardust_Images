process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var session = require('express-session');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const photosRouter = require('./routes/photos');
//const emailRouter = require('./routes/email');
const pagesRouter = require('./routes/pages');

app.use('/gallery', photosRouter);
// app.use('/send', emailRouter);
app.use('/pages', pagesRouter);
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