const express = require("express");

const { getAllUsers, createUser, updateUser, deleteUser } = require("../controllers/users.controller");

const { userExist } = require("../middlewares/users.middlewares");

const { createUserValidators, updateUserValidator } = require("../middlewares/validators.middlewares");

const usersRoute = express.Router();

usersRoute.get("/", getAllUsers);
usersRoute.post("/", createUserValidators, createUser);
usersRoute.patch("/:id", userExist, updateUserValidator, updateUser);
usersRoute.delete("/:id", userExist, deleteUser);

module.exports = { usersRoute };