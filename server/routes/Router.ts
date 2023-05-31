const { Prompt, User } = require('../models/dataModels.ts');
const session = require('express-session');

const collections = ['prompts', 'users'] 

class Router { 
  constructor(app) {
    this.app = app;
      
    app.use(session({
      secret: "secret-key",
      resave: false,
      saveUninitialized: false, 
    }));


    collections.forEach(col => {
      this.collectionRoutes(col);
    });

    app.get('/', (req, res) => {
      try {
        const sessionId = req.sessionID;
        const data = {sessionId}

        res.status(200).json(data);
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
      }
      
    });
  }
  

  collectionRoutes(collection) {
    const { app } = this;

    let model;
    if (collection === 'prompts') {
      model = Prompt;
    } else {
      model = User;
    }

    app.post(`/${collection}`, async (req, res) => {
      try {
        const data = await model.model.create(req.body);
        res.status(200).json(data);
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
      }
    });

    app.get(`/${collection}`, async (req, res) => {
      try {
        const datas = await model.model.find({});
        res.status(200).json(datas);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    app.get(`/${collection}/:name`, async (req, res) => {
      try {
        const { name } = req.params;
        const data = await model.findByName(name);
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    app.delete(`/${collection}/:name`, async (req, res) => {
      try {
        const { name } = req.params;
        const data = await model.findOneAndDelete({ name });
        if (!data) {
          return res.status(404).json({ message: 'Prompt not found' });
        }
        res.status(200).json({ message: 'Prompt deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  }
}

module.exports = Router;

