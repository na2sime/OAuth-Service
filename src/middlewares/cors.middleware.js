const cors = require("cors");

/**
 * Configuration options for Cross-Origin Resource Sharing (CORS).
 *
 * @typedef {Object} CorsOptions
 * @property {string} origin - The allowed origin(s) for cross-origin requests. Use "*" for all origins.
 * @property {string} allowedHeaders - The allowed headers for cross-origin requests.
 * @property {string} methods - The allowed methods for cross-origin requests.
 */
const corsOptions = {
    origin: "*",
    allowedHeaders:
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
    methods: "GET, POST, PUT, DELETE, PATCH",
};

/**
 * Middleware function for enabling CORS in a Node.js application.
 *
 * @param {Object} corsOptions - Options object for configuring CORS behavior.
 * @returns {Function} - Express middleware function.
 */
const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;