
////////////////////////////////
////     Road to Hire      ////
///     LifeSports App     ///
/////////////////////////////
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;
let uri = "mongodb://localhost:27017"

// register middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  uri = "mongodb+srv://mlejohn21:<lejohn21>@cluster0-1t3ty.mongodb.net/test?retryWrites=true&w=majority"  // connection string for Atlas here  
} else {
  uri = "mongodb://localhost:27017"  // connection string for localhost mongo here  
}

// connection to database
mongoose.connect(uri, { useNewUrlParser: true, 
                        useCreateIndex: true, 
                        useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB connection is live");
})

// register api catalogue
const exercisesRouter = require('./routes/exercises');
const usersRouter =     require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Creating live connection to reactjs app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
