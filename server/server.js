const express =  require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const Router = require('./routes/Router.ts')
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors());

const username = process.env.MONGO_CLUSTER_USERNAME;
const password = process.env.MONGO_CLUSTER_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@cluster0.pcnqalo.mongodb.net/SpellBookDB?retryWrites=true&w=majority`

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to cluster");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.listen(8000, () => {
  console.log("Server started on port 8000");
})

// app.use(session({
//   secret: "",
//   resave: false,
//   saveUninitialized: false, 
// }));


new Router(app);

