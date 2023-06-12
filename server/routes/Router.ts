const { promptModel, userModel, sessionModel } = require('../models/dataModels.ts');
const session = require('express-session');
const MongoDBsessionModel = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config()



const username = process.env.MONGO_CLUSTER_USERNAME;
const password = process.env.MONGO_CLUSTER_PASSWORD;
const db = "SpellBookDB"; // empty for test DB
const uri = `mongodb+srv://${username}:${password}@cluster0.pcnqalo.mongodb.net/${db}?retryWrites=true&w=majority`

const collections = ['prompts', 'users', 'sessions'] 

class Router { 
  constructor(app) {
    this.app = app;
    
    this.connectMongo();


    // const store = new MongoDBsessionModel({
    //   uri: uri,
    //   collection: "sessions",
    // })

    app.use(session({
      secret: "secret-key",
      resave: false,
      saveUninitialized: false,
      // store: store,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      }
    }));

    collections.forEach(col => {
      this.collectionRoutes(col);
    });

    app.get('/', (req, res) => {
      try {
        const sessionId = req.sessionID;
        const data = {sessionId}
        req.session.isAuth = true;
        res.status(200).json(data);
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
      }
    });
  }
  
  async connectMongo() {
    try {
      await mongoose.connect(uri);
      console.log("Connected to MongoDB cluster");
    } catch (error) {
      console.error(error);
    }
  }


  collectionRoutes(collection) {
    const { app } = this;

    let model;
    if (collection === 'prompts') {
      model = promptModel;
    } else if (collection === 'users') {
      model = userModel;
    } else if (collection === 'sessions'){
      model = sessionModel;
    }

    app.post(`/${collection}`, async (req, res) => {
      try {
        const data = await model.create(req.body);
        res.status(200).json(data);
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
      }
    });

    app.get(`/${collection}`, async (req, res) => {
      try {
        const datas = await model.find({});
        res.status(200).json(datas);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
    
    app.get(`/${collection}/:name`, async (req, res) => {
      try {
        const { name } = req.params;
        const data = await model.findOne({name: name});
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    app.get(`/${collection}/by_id/:uuid`, async (req, res) => {
      try {
        const { uuid } = req.params;
        const data = await model.find({uuid: uuid});
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    app.delete(`/${collection}/:name`, async (req, res) => {
      try {
        const { name } = req.params;
        const data = await model.deleteMany({name: name});

        if (!data) {
          return res.status(404).json({ message: 'None found to delete' });
        }
        res.status(200).json({ message: 'deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  }
}

module.exports = Router;

