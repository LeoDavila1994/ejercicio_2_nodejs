const { Users } = require('./users.model');
const { Tasks } = require('./tasks.model');

const initialModels = () => {
    Users.hasMany(Tasks, { foreignKey: 'userId' });
    Tasks.belongsTo(Users);
};

module.exports = { initialModels };