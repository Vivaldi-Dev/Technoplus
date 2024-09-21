const jwt = require('jsonwebtoken');
const User = require('../db/models/User');
const { use } = require('../routes/routes');
require('dotenv').config({ path: `${process.cwd()}/.env` });

const generatetokenandSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        maxAge: 15 * 24 * 60 * 60 * 1000, 
    });

    return token;
};




module.exports = generatetokenandSetCookie;
