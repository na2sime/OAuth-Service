/**
 * The name of the model.
 *
 * @type {string}
 */
let mongoose = require('mongoose'),
    modelName = 'user',
    schemaDefinition = require('../schema/' + modelName),
    schemaInstance = mongoose.Schema(schemaDefinition)

/**
 * Represents an instance of a mongoose model.
 * @typedef {Object} ModelInstance
 * @property {string} modelName - The name of the mongoose model.
 * @property {SchemaInstance} schemaInstance - The instance of the mongoose schema used by the model.
 */
let modelInstance = mongoose.model(modelName, schemaInstance);

module.exports = modelInstance;