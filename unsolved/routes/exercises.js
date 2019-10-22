
/////////////////////////////////////////////
//// API endpoints for managing exercises //
///////////////////////////////////////////
const express = require('express');
const router = require('express').Router();
let Exercise = require('../models/exercise.model');
const mongoose = require('mongoose');
const app = express();
const MongoClient = require("mongodb").MongoClient 
const logger = require("morgan");
const PORT = process.env.PORT || 3025;
// Your Challenge: Make five routes. Each will use mongojs methods
// to interact with your mongoDB database, as instructed below.
// You will be using express Router and Mongoose
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

//schema
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
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


// 1. get all exercise logs on record
// GET: /
// ========================================
app.get('/', (req, res) => {
    db.Exercise.find({}, (err, found) => {
        if (err) {
            console.log(err)
        } else {
            res.json(found)
        }
    })
})

// 2. add a new exercise log
// POST: /add
// ========================================
app.post('/add', (req, res) => {
    db.Exercise.insert(
        {
            $set: {
                username: {},
                description: {},
                duration: {},
                date: {}
            }
        }
    )
})
// 3. retrieve a specfic exercise log
// GET: /:id
// ========================================
app.get('/:id', (req, res) => {
    db.Exercise.findOne(
        {
            _id: mongojs.js.ObjectId(req.params.id)
        }
    )
})

// 4. delete a specfic exercise log
// DELETE: /:id
// ========================================
app.delete('/delet/:id', (req, res) => {
    const collection = db.collection('excercise')
    collection.deleteOne(
        {
            _id: ObjectId(req.params.id)
        },
        (error, data) => {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        }
    );
})

// 5. retrieve a specific exercise log and update it 
// with information sent by client on req body
// POST: /update/:id
// ========================================
app.post('/update/:id', (req, res) => {
    db.Exercise.update(
        {
            _id: mongojs.ObjectId(req.params.id)
        },
        {
            $set: {
                username: {},
                description: {},
                duration: {},
                date: {}
            }
        }), (error, data) => {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        }
})
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
module.exports = router;