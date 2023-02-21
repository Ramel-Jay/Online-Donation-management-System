module.exports = ( sequelize, DataType ) => {
    const Admin = sequelize.define("Admin", {
        firstName: {
            type: DataType.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataType.STRING,
            allowNull: false,
        },
        address: {
            type: DataType.STRING,
            allowNull: false,
        },
        gender: {
            type: DataType.STRING,
            allowNull: false,
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
        },
        number: {
            type: DataType.BIGINT,
            allowNull: false,
            unique: true,
        },
        adminType: {
            type: DataType.STRING,
            allowNull: false,
        },
        image: {
            type: DataType.STRING,
            allowNull: false,
        },
        username: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
        },
    });
    return Admin;
};