const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const {isAuthenticated, hasRole} = require("../middlewares/user.middleware");

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/register', AuthController.register);
router.post('/refreshtoken', isAuthenticated, AuthController.refreshToken);
router.post('/validateRole', isAuthenticated, hasRole('admin'), AuthController.validateRole);
router.post('/updatePassword', isAuthenticated, AuthController.updatePassword);
router.post('/verify/token', isAuthenticated, AuthController.verifyToken);
router.post('/verify/refreshToken', isAuthenticated, AuthController.verifyRefreshToken);
router.post('/verify/user', isAuthenticated, AuthController.verifyUser);
router.post('/updateUser', isAuthenticated, hasRole('admin'), AuthController.updateUser);
router.delete('/deleteUser', isAuthenticated, hasRole('admin'), AuthController.deleteUser);

module.exports = router;