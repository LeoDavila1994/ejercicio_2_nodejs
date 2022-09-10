const express = require("express");

const tasksRoute = express.Router();

const { getAllTasks, getAllTasksByStatus, createTask, updateTask, deleteTask } = require("../controllers/tasks.controller");

const { taskExist, taskByStatus, userIdExist, taskExistActive } = require("../middlewares/tasks.middlewares");

tasksRoute.get("/", getAllTasks);
tasksRoute.get("/:status", taskByStatus, getAllTasksByStatus);
tasksRoute.post("/",userIdExist, createTask);
tasksRoute.patch("/:id", taskExistActive, updateTask);
tasksRoute.delete("/:id", taskExist, deleteTask);

module.exports = { tasksRoute };