const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../mongo/models/user.model');
const TokenModel = require('../mongo/models/token.model');

/**
 * Generates credentials for authentication.
 *
 * @returns {Object} - An object containing the generated credentials.
 * @throws {Error} - If there is an error during credential generation.
 */
exports.generateCredentials = async (user) => {
    const token = await jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 7200,
    });

    const refreshToken = await jwt.sign({id: user.id}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: 604800,
    });

    const tokenData = {
        accessToken: token,
        accessTokenExpiresAt: new Date(Date.now() + 7200000),
        refreshToken: refreshToken,
        refreshTokenExpiresAt: new Date(Date.now() + 604800000),
        user: user,
    };

    await TokenModel.create(tokenData);

    return {
        accessToken: token,
        refreshToken: refreshToken,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        },
    };
}

/**
 * Refreshes the access token.
 *
 * @returns {Promise} A promise that resolves with the refreshed access token.
 */
exports.refreshToken = async (refreshToken) => {
    const token = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    TokenModel.deleteMany({refreshToken: refreshToken});

    const user = await UserModel.findById(token.id);

    return this.generateCredentials(user);
}

/**
 * Logs in the user with the provided credentials
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {boolean} - True if the login was successful, false otherwise.
 */
exports.login = async (email, password) => {
    const user = await UserModel.findOne({email: email});

    if (!user) {
        throw new Error('User not found');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        throw new Error('Invalid password');
    }

    return this.generateCredentials(user);
}

/**
 * Logout function.
 *
 * This function is responsible for logging out the user from the system.
 * It clears any user session or authentication data to ensure the user is
 * no longer granted access to the application.
 *
 * @param {object} userData - The user data object.
 * @return {void}
 */
exports.logout = async (refreshToken) => {
    TokenModel.deleteMany({refreshToken: refreshToken});
}

/**
 * Registers a new user in the system.
 *
 * @param {string} username The username of the user.
 * @param {string} password The password of the user.
 * @param {string} email The email address of the user.
 * @returns {Promise} A promise that resolves to the registered user object.
 * @throws {Error} If the username is already taken or any of the parameters are missing or invalid.
 */
exports.register = async (email, password, role, firstname, lastname) => {
    const user = await UserModel.create({
        email: email,
        password: await bcrypt.hash(password, 10),
        role: role,
        firstname: firstname,
        lastname: lastname,
    });

    return this.generateCredentials(user);
}

/**
 * Verifies the authenticity of a given token.
 *
 * @param {string} token - The token to verify.
 * @returns {boolean} - True when the token is valid, false otherwise.
 */
exports.verifyToken = async (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

/**
 * Verifies the refresh token provided.
 *
 * @param {string} refreshToken - The refresh token to be verified.
 * @returns {boolean} - Whether the refresh token is valid or not.
 */
exports.verifyRefreshToken = async (token) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

/**
 * Verifies if a user is valid by checking their details.
 *
 * @param {string} username - The username of the user to be verified.
 * @param {string} password - The password of the user to be verified.
 * @returns {boolean} - True if user is valid, false otherwise.
 */
exports.verifyUser = async (token) => {
    const tokenData = await TokenModel.findOne({accessToken: token});

    if (!tokenData) {
        throw new Error('Invalid token');
    }

    return tokenData.user;
}

/**
 * Validates the role based on certain criteria.
 *
 * @param {string} role - The role to be validated.
 * @returns {boolean} - Returns true if the role is valid, false otherwise.
 */
exports.validateRole = async (token, role) => {
    const tokenData = await TokenModel.findOne({accessToken: token});

    if (!tokenData) {
        throw new Error('Invalid token');
    }

    if (tokenData.user.role !== role) {
        throw new Error('Invalid role');
    }

    return tokenData.user;
}

/**
 * Updates the user's password in the system.
 *
 * @param {string} userId - The unique identifier of the user.
 * @param {string} newPassword - The new password for the user.
 * @returns {Promise} - A promise that resolves when the password is successfully updated or rejects with an error.
 */
exports.updatePassword = async (token, password) => {
    const tokenData = await TokenModel.findOne({accessToken: token});

    if (!tokenData) {
        throw new Error('Invalid token');
    }

    const user = await UserModel.findById(tokenData.user.id);

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    return true;
}

/**
 * Updates user information.
 *
 * @param {string} userId - The ID of the user to update.
 * @param {object} updatedInfo - The updated user information.
 * @param {Function} callback - The callback function to handle the result.
 * @returns {void}
 */
exports.updateUser = async (token, user) => {
    const tokenData = await TokenModel.findOne({accessToken: token});

    if (!tokenData) {
        throw new Error('Invalid token');
    }

    const userInstance = await UserModel.findById(tokenData.user.id);

    userInstance.email = user.email;
    userInstance.role = user.role;
    userInstance.firstname = user.firstname;
    userInstance.lastname = user.lastname;
    await userInstance.save();

    return true;
}

/**
 * Deletes a user from the system.
 *
 * @param {string} userId - The ID of the user to be deleted.
 * @returns {boolean} - True if the user is deleted successfully, else false.
 */
exports.deleteUser = async (token) => {
    const tokenData = await TokenModel.findOne({accessToken: token});

    if (!tokenData) {
        throw new Error('Invalid token');
    }

    await UserModel.deleteOne({_id: tokenData.user.id});

    return true;
}