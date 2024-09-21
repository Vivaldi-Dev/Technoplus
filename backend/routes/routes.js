
const { signup, verifyEmail, logout, login, forgotpassword, resetPassword, checkAuth } = require('../controller/authocontroller');
const verifyToken = require('../middleware/verifyToken');

const router = require('express').Router();

router.route('/signup').post(signup);
router.route('/verifyemail').post(verifyEmail);
router.route('/logout').post(logout);
router.route('/login').post(login);
router.route('/forgot-password').post(forgotpassword)
router.route("/reset-password/:token").post(resetPassword)
router.route("/check-auth").get(verifyToken,checkAuth)
module.exports = router;
