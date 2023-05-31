const express =  require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const { Prompt, User } = require('./models/dataModels.ts');

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

function crud(collection = 'prompts'|'users') {
  let model;
  if (collection === 'prompts') {
    model = Prompt;
  } else {
    model = User;
  }
  // Posts 
  app.post(`/${collection}`, async(req, res) => {
    try {
      const data = await model.model.create(req.body);
      res.status(200).json(data);
    } 
    catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});
    }
  })
  // Get all datas
  app.get(`/${collection}`, async(req, res) => {
    try {
      const datas = await model.model.find({});
      res.status(200).json(datas);
    }
    catch (error) {
      res.status(500).json({message: error.message});
    }
  })

  app.get(`/${collection}/:name`, async(req, res) => {
    try {
      const {name} = req.params;
      // console.log(req.params)
      const data = await model.findByName(name);
      console.log(data)
      res.status(200).json(data);
    }
    catch (error) {
      res.status(500).json({message: error.message});
    }
  })

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
  })

};


crud('users');
crud('prompts');

