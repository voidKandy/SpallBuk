const { Model } = require('mongoose');

class ModelController {
  constructor(model) {
    this.model = model;
  }

  findByName(name) {
    return this.model.findOne({ name: name }).exec();
  };

  findOneAndDeleteByName(name) {
    return this.model.deleteMany({ name: name })
  };


}
module.exports = ModelController;
