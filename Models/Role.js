module.exports = (sequelize, DataTypes) => {
    return sequelize.define('roles', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        label: {
            type: DataTypes.STRING
        }
    });
}