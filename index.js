const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const port = process.env.PORT || 5000;
// set up express
const app = express();
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.json());
app.use(cors());
app.use(express.static(publicPath));
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

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('app running on port: ' + port);
});
