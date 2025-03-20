const mongoose = require("mongoose");

const ResourceSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  description: {
    type: String,
  },
});

const resourceModel = mongoose.model("Resource", ResourceSchema);  // Corrigé: nom de la variable
module.exports = resourceModel;


