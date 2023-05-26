const mongoose = require('mongoose');


const promptSchema = mongoose.Schema(
  {
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

module.exports =  Prompt;
