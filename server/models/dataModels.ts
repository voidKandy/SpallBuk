const mongoose = require('mongoose');
const ModelController = require('./ModelController.ts');

const promptSchema = mongoose.Schema(
  {
    user_uuid: {
      type: String,
      required: [true, "Please enter a UUID"]
    },
    name: {
      type: String,
      required: [true, "Please enter a name"]
    },
    description: {
      type: String,
      required: [true, "Please enter a description"]
    },
    prompt: {
      type: String,
      unique: true, 
      dropDups: true,
      required: [true, "Please enter a prompt"]
    }
  },
  {
    timestamps: true
  }
);


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true, 
      dropDups: true,
      required: [true, "Please enter username"]
    },
    uuid: {
      type: String,
      unique: true, 
      dropDups: true,
      required: [true, "Please enter UUID"]
    }
  },
  {
    timestamps: true
  }
)

const promptModel = mongoose.model("Prompt", promptSchema);
const Prompt = new ModelController(promptModel);
const userModel = mongoose.model("User", userSchema);
const User = new ModelController(userModel);



module.exports =  {Prompt, User};
