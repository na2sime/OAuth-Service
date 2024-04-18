const jwt = require('jsonwebtoken');

/**
 * Checks if the user is authenticated by verifying the provided token in the request header.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @return {undefined} - This method does not return anything.
 */
function isAuthenticated(req, res, next) {
    // Get token from header
    const token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token)
        return res.status(401).send('Access Denied: No Token Provided!');

    try {
        req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (error) {
        return res.status(400).send('Invalid Token');
    }
}

/**
 * Checks if the user has a specific role.
 *
 * @param {string} role - The role to check against.
 * @return {Function} - A middleware function that checks if the user has the specified role.
 */
function hasRole(role) {
    return function (req, res, next) {
        if (req.user.role !== role)
            return res.status(403).send('Access Denied: You dont have correct role');
        next();
    };
}

module.exports = {
    isAuthenticated,
    hasRole
};