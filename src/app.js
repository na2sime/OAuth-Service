const express = require("express");
const bodyParser = require("body-parser"); //Package gére à analyser data dans corps des requêtes
const app = express();
const DebugControl = require('./utils/debug.js');
const corsMiddleware = require("./middlewares/cors.middleware");

require('dotenv').config();

const authRoutes = require("./routes/auth.route");

//Custom le Headers des requêtes!
app.use(corsMiddleware);

app.use(bodyParser.json());

//Récuperer la data encodée sous forme URL
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(DebugControl.log.request())

//ROUTES
app.use("/v1/auth", authRoutes);

module.exports = app;