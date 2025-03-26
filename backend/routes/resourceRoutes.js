const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource");
const Task = require("../models/Task");

// جلب جميع الموارد أو الموارد المرتبطة بـ taskId
router.get("/", async (req, res) => {
  try {
    const { taskId } = req.query;
    const resources = taskId
      ? await Resource.find({ taskId })
      : await Resource.find();
    res.status(200).json(resources); // دائمًا يعيد مصفوفة، حتى لو كانت فارغة
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ error: error.message });
  }
});

// جلب مورد محدد باستخدام معرفه
router.get("/:id", async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json(resource);
  } catch (error) {
    console.error("Error fetching resource:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, quantity, unit, taskId } = req.body;

    if (!name || !description || !quantity || !unit || !taskId) {
      return res.status(400).json({ 
        message: "All fields (name, description, quantity, unit, taskId) are required" 
      });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const resource = new Resource({
      name,
      description,
      quantity,
      unit,
      taskId,
    });
    await resource.save();

    task.resources.push(resource._id);
    await task.save();

    res.status(201).json(resource);
  } catch (error) {
    console.error("Error creating resource:", error);
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, description, quantity, unit, taskId } = req.body;

    if (!name || !description || !quantity || !unit || !taskId) {
      return res.status(400).json({ 
        message: "All fields (name, description, quantity, unit, taskId) are required" 
      });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    if (taskId && taskId !== resource.taskId.toString()) {
      await Task.findByIdAndUpdate(resource.taskId, {
        $pull: { resources: resource._id },
      });

      task.resources.push(resource._id);
      await task.save();
    }

    const updatedResource = await Resource.findByIdAndUpdate(
      req.params.id,
      { name, description, quantity, unit, taskId },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedResource);
  } catch (error) {
    console.error("Error updating resource:", error);
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    const task = await Task.findById(resource.taskId);
    if (task) {
      task.resources = task.resources.filter(
        (resId) => resId.toString() !== resource._id.toString()
      );
      await task.save();
    }

    await Resource.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (error) {
    console.error("Error deleting resource:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;