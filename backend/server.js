const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app= express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


mongoose.Promise = global.Promise;
// const uri = `mongodb://127.0.0.1:27017/mytestdb`;
const uri = process.env.MONGODB_URI || `mongodb://localhost:27017/mydb`;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})