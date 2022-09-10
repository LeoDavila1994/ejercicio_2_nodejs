const { Users } = require("../models/users.model");

const userExist = async (req, res, next) => {
    const { id } = req.params;
    const user = await Users.findOne({ where: { id } });

    try {
        if(!user) {
            return res.status(404).json({
                status: "error",
                message: `The user whit ID: ${id} doesent exist`
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error);
    }
};

module.exports = { userExist };