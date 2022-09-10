const { Tasks } = require('../models/tasks.model');
const { Users } = require('../models/users.model');

const userIdExist = async (req, res, next) => {
    const { userId } = req.body;

    const user = await Users.findOne({
        where: { id: userId, status: 'active' },
    });

    try {
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `The user whit ID: ${userId} doesent exist or your status ar inactive.`,
            });
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

const taskExist = async (req, res, next) => {
    const { id } = req.params;
    const task = await Tasks.findOne({ where: { id } });

    try {
        if (!task) {
            return res.status(404).json({
                status: 'error',
                message: `Task whit ID: ${id} doesent exist`,
            });
        }

        req.task = task;

        next();
    } catch (error) {
        console.log(error);
    }
};

const taskExistActive = async (req, res, next) => {
    const { id } = req.params;
    const task = await Tasks.findOne({ where: { id, status: 'active' } });

    try {
        if (!task) {
            return res.status(404).json({
                status: 'error',
                message: `Task whit ID: ${id} doesent exist or the status is diferent to active`,
            });
        }

        req.task = task;

        next();
    } catch (error) {
        console.log(error);
    }
};

const taskByStatus = async (req, res, next) => {
    const { status } = req.params;
    const statusExisting = ['active', 'completed', 'late', 'cancelled'];

    let task;

    for (let i = 0; i < statusExisting.length; i++) {
        if (status === statusExisting[i]) {
            task = await Tasks.findAll({
                where: { status },
                attributes: [
                    'id',
                    'title',
                    'limitDate',
                    'startDate',
                    'finishDate',
                    'status',
                ],
                include: {
                    model: Users,
                    attributes: ['id', 'name', 'email', 'status'],
                },
            });
        }
    }

    try {
        if (task === undefined) {
            return res.status(404).json({
                status: 'error',
                message: `The status: ${status} doesent exist in our server`,
            });
        }

        req.task = task;

        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = { taskExist, taskByStatus, userIdExist, taskExistActive };
