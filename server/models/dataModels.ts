const mongoose = require('mongoose');

const promptSchema = mongoose.Schema(
  {
    uuid: {
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
      required: [true, "Please enter session"]
    },
    uuid: {
      type: String,
      required: [true, "Please enter UUID"]
    }
  },
  {
    timestamps: true
  }
)

const promptModel = mongoose.model("Prompt", promptSchema);

const userModel = mongoose.model("User", userSchema);

const sessionModel = mongoose.model("Session", sessionSchema);

module.exports =  {promptModel, userModel, sessionModel};
