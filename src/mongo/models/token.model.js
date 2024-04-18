/**
 * Creates a new mongoose Schema instance.
 *
 * @param {object} schemaDefinition - The definition of the schema.
 * @returns {object} - The new mongoose Schema instance.
 */
let mongoose = require('mongoose'),
    modelName = 'token',
    schemaDefinition = require('../schema/' + modelName),
    schemaInstance = mongoose.Schema(schemaDefinition);

schemaInstance.index({"refreshTokenExpiresAt": 1}, {expireAfterSeconds: 0});

/**
 * Represents an instance of a mongoose model.
 * @typedef {Object} ModelInstance
 * @property {string} modelName - The name of the model.
 * @property {SchemaInstance} schemaInstance - The schema instance associated with the model.
 */
let modelInstance = mongoose.model(modelName, schemaInstance);

module.exports = modelInstance;