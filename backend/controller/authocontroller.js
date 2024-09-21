const bcrypt = require('bcrypt');
const generateVerification = require('../utils/generateVerificationCode');
const generatetokenandSetCookie = require('../utils/generateToken');
const User = require('../db/models/User');
const { sendeverificationEmail, sendPasswordResetEmail, sendResetSuccessEmail } = require('../mailtrap/emails');
const crypto = require('crypto');
const { Op } = require('sequelize');
require('dotenv').config({ path: `${process.cwd()}/.env` })



const signup = async (req, res, next) => {
    const { email, password, name } = req.body;

    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required");
        }

        const userAlreadyExists = await User.findOne({ where: { email } });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = generateVerification();

        const user = await User.create({
            email,
            password: hashedPassword,
            verificationToken,
            name,
            verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });

        generatetokenandSetCookie(res, user.id);

        // await sendeverificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user.dataValues,
                password: undefined
            }
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const verifyEmail = async (req, res) => {
    const { code } = req.body;

    try {
        const user = await User.findOne({
            where: {
                verificationToken: code,
                verificationTokenExpiresAt: {
                    [Op.gt]: new Date()
                }
            }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();

        res.status(200).json({ success: true, message: "Email verified successfully" });

    } catch (error) {
        console.error(`Error verifying email: ${error.message}`);
        res.status(500).json({ success: false, message: "An error occurred while verifying the email" });
    }
};

const logout = async (req, res) => {
    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict"
        });

        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {

        res.status(500).json({ success: false, message: "An error occurred during logout" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        generatetokenandSetCookie(res, user.id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user.dataValues,
                password: undefined,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "An error occurred during login",
            error: error.message,
        });
    }
};

const forgotpassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();

        const resetURL = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
        await sendPasswordResetEmail(user.email, resetURL);

        return res.status(200).json({
            success: true,
            message: "Password reset email sent"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while processing the password reset",
            error: error.message
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpiresAt: { [Op.gt]: Date.now() },
            }
        });

        console.log(user);

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({ success: true, message: "Password reset successful" });
    } catch (error) {
        console.log("Error in resetPassword", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const checkAuth = async (req, res) => {
    try {

        const user = await User.findByPk(req.userId, {
            attributes: { exclude: ['password'] } 
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



module.exports = { signup, verifyEmail, logout, login, forgotpassword, resetPassword , checkAuth };
