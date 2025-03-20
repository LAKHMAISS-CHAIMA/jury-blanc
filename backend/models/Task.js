const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true, 
  },
  endDate: {
    type: Date,
    required: true,
  },
  resources: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
    },
  ],
});

const taskModel = mongoose.model("Task", TaskSchema);
module.exports = taskModel;