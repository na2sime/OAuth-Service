/**
 * Normalizes the given port into a number, string, or false.
 *
 * @param {number|string} val - The port value to normalize.
 * @returns {(number|string|false)} - The normalized port value.
 */
exports.normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

/**
 * Middleware function for handling errors in Express.js applications.
 *
 * @param {Error} err - The error object passed by Express.js.
 * @param {Object} req - The Express.js request object.
 * @param {Object} res - The Express.js response object.
 * @param {Function} next - The Express.js next() function.
 *
 * @returns {void}
 */
exports.errorHandler = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const address = server.address();
    const bind =
        typeof address === "string" ? "pipe " + address : "port: " + port;
    switch (
        error.code
        ) {
        case "EACCES":
            console.error(bind + " requires elevated privileges.");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use.");
            process.exit(1);
            break;
        default:
            throw error;
    }
};