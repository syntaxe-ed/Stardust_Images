const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');

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

const photosRouter = require ('./routes/photos');
const emailRouter = require('./routes/email');

app.use('/gallery', photosRouter);
app.use('/send', emailRouter);
app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}))

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});