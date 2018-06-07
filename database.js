"use strict";
const Mongo = require("mongodb");
let databaseURL = "mongodb://localhost:27017";
let databaseName = "Test";
let db;
let students;
if (process.env.NODE_ENV == "production") {
    // databaseURL = "mongodb://username:password@hostname:port/database";
    databaseURL = "mongodb://testuser:testpassword@ds129532.mlab.com:29532/eia2";
    databaseName = "eia2";
}
// handleConnect wird aufgerufen wenn der Versuch, die Connection zur Datenbank herzustellen, erfolgte
Mongo.MongoClient.connect(databaseURL, (_e, _db) => {
    if (_e)
        console.error("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db.db(databaseName);
        students = db.collection("students");
    }
});
function insert(_student) {
    students.insertOne(_student, (_e) => {
        console.log("Database insertion returned: " + _e);
    });
}
exports.insert = insert;
function refresh(_callback) {
    var cursor = students.find();
    cursor.toArray((_e, _result) => {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(_result));
    });
}
exports.refresh = refresh;
//# sourceMappingURL=Database.js.map