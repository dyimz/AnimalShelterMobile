const express = require('express');
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errors');
const app = express();
const bodyParser = require('body-parser')

const fileUpload = require('express-fileupload')


const dotenv = require('dotenv');

app.use(express.json());

app.use(express.urlencoded({limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(fileUpload());

const animals = require('./routes/animal');
const healths = require('./routes/health');

const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');

app.use('/api/v1', animals);
app.use('/api/v1', healths);

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use(errorMiddleware);

module.exports = app