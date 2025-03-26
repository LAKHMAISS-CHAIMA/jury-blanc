const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const Project = require("../models/Project");

router.get("/", async (req, res) => {
    try {
        const { projectId } = req.query;
        let tasks;
        
        if (projectId) {
            tasks = await Task.find({ projectId }).populate("resources");
        } else {
            tasks = await Task.find().populate("resources");
        }
        
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate("resources");
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, description, startDate, endDate, status, projectId } = req.body;
        
        const task = new Task({ 
            name, 
            description, 
            startDate, 
            endDate,
            status,
            projectId 
        });
        await task.save();

        if (projectId) {
            const project = await Project.findById(projectId);
            if (project) {
                project.tasks.push(task._id);
                await project.save();
            } else {
                return res.status(404).json({ message: "Project not found" });
            }
        } else {
            return res.status(400).json({ message: "Project ID required" }); 
        }

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { name, description, startDate, endDate, status, projectId } = req.body;
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { name, description, startDate, endDate, status, projectId },
            { new: true, runValidators: true }
        );
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        await Project.updateOne(
            { tasks: req.params.id },
            { $pull: { tasks: req.params.id } }
        );
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;