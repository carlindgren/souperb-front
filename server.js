const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 5000;
require('dotenv').config();
// set up express
const app = express();

app.use(express.json());
app.use(cors());

//set up mongoose
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

//set up routes

app.use('/users', require('./routes/userRouter'));
app.use('/breads', require('./routes/breadRouter'));
app.use('/drinks', require('./routes/drinkRouter'));
app.use('/soups', require('./routes/soupRouter'));

app.listen(port, () => {
  console.log('app running on port: ' + port);
});
