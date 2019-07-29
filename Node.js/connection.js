const mongoose = require("mongoose");

var url = "mongodb+srv://admin:admin@cluster0-akwrv.mongodb.net/Events_app?retryWrites=true";

mongoose.connect(url);

mongoose.Promise = global.Promise;

let db = mongoose.connection

db.on("error", console.error.bind("Mongo connection error"));