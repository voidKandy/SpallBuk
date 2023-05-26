const express =  require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Prompt = require('./models/dataModels.ts');


require('dotenv').config()

const app = express();
app.use(express.json());


// Connect
const username = process.env.MONGO_CLUSTER_USERNAME;
const password = process.env.MONGO_CLUSTER_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@cluster0.pcnqalo.mongodb.net/?retryWrites=true&w=majority`

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


// Routes

// Post Prompt
app.post('/prompts', async(req, res) => {
  try {
    const prompt = await Prompt.create(req.body);
    res.status(200).json(prompt);
  } 
  catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
})

// Get all datas
app.get('/prompts', async(req, res) => {
  try {
    const prompts = await Prompt.find({});
    res.status(200).json(prompts);
  }
  catch (error) {
    res.status(500).json({message: error.message});
  }
})

// Get data from name
app.get('/prompts/:name', async(req, res) => {
  try {
    const {name} = req.params;
    const prompt = await Prompt.findByName(name);
    res.status(200).json(prompt);
  }
  catch (error) {
    res.status(500).json({message: error.message});
  }
})

// Delete by name
app.delete('/prompts/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const prompt = await Prompt.findOneAndDelete({ name });
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.status(200).json({ message: 'Prompt deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

