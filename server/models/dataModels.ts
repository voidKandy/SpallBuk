const mongoose = require('mongoose');
const ModelController = require('../controllers/ModelController.ts');

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

const sessionSchema = mongoose.Schema(
  {
    // Session 'name'
    name: {
      type: String,
      unique: true, 
      dropDups: true,
      required: [true, "Please enter sesison"]
    },
    user_uuid: {
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

const sessionModel = mongoose.model("Session", sessionSchema);
const Session = new ModelController(sessionModel);

module.exports =  {Prompt, User, Session};
