const AuthService = require('../services/auth.service.js');

/**
 * Performs a login operation for the user.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {boolean} - True if the login was successful, false otherwise.
 */
exports.login = async (req, res) => {
    try {
        const user = await AuthService.login(req.body.email, req.body.password);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

/**
 * Logs out the current user by performing necessary actions.
 *
 * @returns {void}
 */
exports.logout = async (req, res) => {
    try {
        await AuthService.logout(req.body.refreshToken);
        res.status(200).json({message: 'User logged out'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

/**
 * Generates credentials for user authentication.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @return {Promise<string>} - A promise that resolves to the generated credentials.
 * @throws {Error} - If the username or password is invalid.
 */
exports.generateCredentials = async (req, res) => {
    try {
        // Assuming user data is sent in request body
        const credentials = await AuthService.generateCredentials(req.body.user);
        res.status(200).json(credentials);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

/**
 * Refreshes the current authentication token.
 *
 * @param {string} userToken - The current user token.
 * @returns {Promise<string>} - A promise that resolves with the refreshed token.
 */
exports.refreshToken = async (req, res) => {
    try {
        const newCredentials = await AuthService.refreshToken(req.body.refreshToken);
        res.status(200).json(newCredentials);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

/**
 * Registers a user with the system.
 *
 * @param {string} username - The username of the user being registered.
 * @param {string} password - The password for the user's account.
 * @param {string} email - The email address of the user.
 * @returns {boolean} - True if the registration was successful, false otherwise.
 *
 * @throws {Error} - If any of the required parameters are missing or invalid.
 *
 * @example
 * register("johnsmith", "password123", "john@example.com");
 */
exports.register = async (req, res) => {
    try {
        const registeredUser = await AuthService.register(req.body.email, req.body.password, req.body.role, req.body.firstname, req.body.lastname);
        res.status(200).json(registeredUser);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

/**
 * Verifies if a token is valid or not.
 *
 * @param {string} token - The token to be verified.
 * @returns {boolean} - True if the token is valid, false otherwise.
 */
exports.verifyToken = async (req, res) => {
    try {
        const decodedToken = await AuthService.verifyToken(req.body.token);
        res.status(200).json(decodedToken);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

/**
 * Verifies the given refresh token.
 *
 * @param {string} refreshToken - The refresh token to be verified.
 * @returns {boolean} - True if the refresh token is valid, false otherwise.
 * @throws {Error} - If the refresh token is not provided or invalid.
 *
 * @example
 *
 * const refreshToken = 'abc123';
 *
 * if (exports.verifyRefreshToken(refreshToken)) {
 *   console.log('Refresh token is valid');
 * } else {
 *   console.error('Refresh token is invalid');
 * }
 */
exports.verifyRefreshToken = async (req, res) => {
    try {
        const decodedRefreshToken = await AuthService.verifyRefreshToken(req.body.refreshToken);
        res.status(200).json(decodedRefreshToken);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

/**
 * Function to validate a role.
 *
 * @param {string} role - The role to be validated.
 * @return {boolean} - Returns true if the role is valid, otherwise false.
 */
exports.validateRole = async (req, res) => {
    try {
        const user = await AuthService.validateRole(req.body.token, req.body.role);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

/**
 * Updates the user's password.
 *
 * @param {string} newPassword - The new password for the user.
 * @returns {Promise<boolean>} - A Promise that resolves to a boolean indicating whether the password was updated successfully.
 */
exports.updatePassword = async (req, res) => {
    try {
        await AuthService.updatePassword(req.body.token, req.body.password);
        res.status(200).json({message: 'Password updated successfully'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

/**
 * Verifies if a user is valid based on certain criteria.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {boolean} - Returns true if the user is valid, otherwise false.
 */
exports.verifyUser = async (req, res) => {
    try {
        const user = await AuthService.verifyUser(req.body.token);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

/**
 * Updates the user with new information.
 *
 * @param {object} user - The user object to be updated.
 * @param {object} newData - The new information to update the user with.
 * @returns {object} - The updated user object.
 */
exports.updateUser = async (req, res) => {
    try {
        await AuthService.updateUser(req.body.token, req.body.user);
        res.status(200).json({message: 'User updated successfully'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

/**
 * Deletes a user from the system.
 *
 * @param {string} userId - The unique identifier of the user to be deleted.
 * @returns {boolean} - `true` if the user was successfully deleted, `false` otherwise.
 */
exports.deleteUser = async (req, res) => {
    try {
        await AuthService.deleteUser(req.body.token);
        res.status(200).json({message: 'User deleted successfully'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};