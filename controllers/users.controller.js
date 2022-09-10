const { Users } = require('../models/users.model');
const { Tasks } = require('../models/tasks.model');

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            where: { status: 'active' },
            attributes: ['id', 'name', 'email', 'status'],
            include: {
                model: Tasks,
                attributes: ['id', 'title', 'limitDate', 'status'],
            },
        });

        res.status(200).json({
            status: 'success',
            data: {
                users,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const newUser = await Users.create({ name, email, password });

        res.status(200).json({
            status: 'success',
            data: { newUser },
        });
    } catch (error) {
        console.log(error);
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const { user } = req;

        await user.update({ name, email });

        res.status(200).json({
            status: 'success',
            data: { user },
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { user } = req;

        await user.update({ status: 'inactive' });

        res.status(204).json({ status: 'success' });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
