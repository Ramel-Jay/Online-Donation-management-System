module.exports = (sequelize, DataType) => {
    const Cash = sequelize.define("Cash", {
        type:{
            type: DataType.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataType.STRING,
            allowNull: false,
        },
        lastName: {
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
        address: {
            type: DataType.STRING,
            allowNull: false,
        },
        gender: {
            type: DataType.STRING(6),
            allowNull: false,
        },
        amount: {
            type: DataType.FLOAT,
            allowNull: false,
        },
        transactionID: {
            type: DataType.BIGINT,
            allowNull: false,
            unique: true,
        },
        request: {
            type: DataType.BOOLEAN,
            allowNull: false,
        },
        username: {
            type: DataType.STRING,
            allowNull: false,
        },
    });

    return Cash;
};