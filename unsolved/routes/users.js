
//////////////////////////////////////////
///   api endpoints for managing users //
////////////////////////////////////////
const express = require("express");
const router = require('express').Router();
let User = require('../models/user.model');
const app = express();
const MongoClient = require("mongodb").MongoClient
const PORT = process.env.PORT || 3000;
// const db = mongojs(databaseUrl, collections);

// Your Challenge: Make rwo routes. Each will use mongojs methods
// to interact with your mongoDB database, as instructed below.
// You will be using express Router and Mongoose
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/


// 1. get all users on record
// GET: /
// ========================================
app.get('/', (req, res) => {
    db.User.find({}, (err, found) => {
        if(err) {
            console.log(err)
        }
    })
})

// 2. add a new user
// POST /add
// ========================================
app.post('/add', (req, res) => {
    db.User.insert({
        $set: { 
            username: { }
        }
    })
})
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
module.exports = router;