const { Tasks } = require('../models/tasks.model');
const { Users } = require('../models/users.model');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Tasks.findAll({
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

        res.status(200).json({
            status: 'success',
            data: { tasks },
        });
    } catch (error) {
        console.log(error);
    }
};

const getAllTasksByStatus = async (req, res) => {
    try {
        const { task } = req;

        res.status(200).json({
            status: 'succes',
            data: {
                task,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

const createTask = async (req, res) => {
    try {
        const { title, userId, startDate, limitDate } = req.body;

        const newTask = await Tasks.create({
            title,
            userId,
            startDate,
            limitDate,
        });

        res.status(200).json({
            status: 'success',
            data: { newTask },
        });
    } catch (error) {
        console.log(error);
    }
};

const updateTask = async (req, res) => {
    try {
        const { task } = req;
        const { finishDate } = req.body;

        let status;

        const indexMonth = JSON.stringify(task.dataValues.limitDate).indexOf(
            '-'
        );
        const limitMonth = JSON.stringify(task.dataValues.limitDate).substring(
            indexMonth + 1,
            indexMonth + 3
        );
        const finishMonth = JSON.stringify(
            task.dataValues.finishDate
        ).substring(indexMonth + 1, indexMonth + 3);

        const indexDay = JSON.stringify(task.dataValues.limitDate).lastIndexOf(
            '-'
        );
        const limitDay = JSON.stringify(task.dataValues.limitDate).substring(
            indexDay + 1,
            indexDay + 3
        );
        const finishDay = JSON.stringify(task.dataValues.finishDate).substring(
            indexDay + 1,
            indexDay + 3
        );

        const generalLimit = limitMonth + limitDay;
        const generalFinish = finishMonth + finishDay;

        if (Number(generalFinish) <= Number(generalLimit)) {
            status = 'completed';
        } else {
            status = 'late';
        }

        await task.update({ finishDate, status });

        res.status(200).json({
            status: 'success',
            data: { task },
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteTask = async (req, res) => {
    try {
        const { task } = req;

        await task.update({ status: 'cancelled' });

        res.status(204).json({ status: 'success' });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllTasks,
    getAllTasksByStatus,
    createTask,
    updateTask,
    deleteTask,
};
