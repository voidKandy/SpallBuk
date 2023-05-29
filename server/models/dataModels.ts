const mongoose = require('mongoose');


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

const Prompt = mongoose.model("Prompt", promptSchema);

Prompt.findByName = function(name) {
  return this.findOne({ name: name }).exec();
};

Prompt.findOneAndDeleteByName = function(name) {
  return this.deleteMany({ name: name })
};


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

const User = mongoose.model("User", userSchema);

User.findOneByName = function(name) {
  return this.FindOne({ name: name }).exec();
}


module.exports =  {Prompt, User};
