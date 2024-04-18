const mongoose = require("mongoose");

/**
 * Establishes a connection to the database.
 *
 * @async
 * @function connectDatabase
 *
 * @returns {undefined}
 *      This function does not return anything.
 */
const connectDatabase = async () => {
    try {
        await mongoose.connect(
            process.env.DB_URI,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Connexion à la base de donnée réussie !");
    } catch (err) {
        console.log(
            "Connexion à la base de donnée échouée ! (" + err + ")"
        );
    }
};

module.exports = connectDatabase;