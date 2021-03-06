
//////////////////////////////////////////
///   api endpoints for managing users //
////////////////////////////////////////
const express = require("express");
const router = require('express').Router();
let User = require('../models/user.model');
const mongoose = require('mongoose');
const logger = require("morgan");
const app = express();
const MongoClient = require("mongodb").MongoClient
const PORT = process.env.PORT || 3000;


// Your Challenge: Make rwo routes. Each will use mongojs methods
// to interact with your mongoDB database, as instructed below.
// You will be using express Router and Mongoose
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
//schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});


//middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


if (process.env.NODE_ENV === "production") {
    uri = process.env.ATLAS_URI;
  } else {  
    // localhost
    uri = process.env.LOCAL_URI  
  }

  let db = ""
let dbName = "notetaker"
MongoClient.connect(uri, { useNewUrlParser: true,                            
                           useUnifiedTopology: true }, 
    (err, client) => 
      {
        if (err) {    
          console.log(err) 
          return
        }        
      console.log("Connected successfully to server") 
      db = client.db(dbName)   
});

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