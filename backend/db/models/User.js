'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const User = sequelize.define('user', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastLogin: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    createDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    resetPasswordToken: {
        type: DataTypes.STRING
    },
    resetPasswordExpiresAt: {
        type: DataTypes.DATE
    },
    verificationToken: {
        type: DataTypes.STRING
    },
    verificationTokenExpiresAt: {
        type: DataTypes.DATE
    },
}, {
    paranoid: true,
    freezeTableName: true, 
    timestamps: false
 
});


module.exports = User;
