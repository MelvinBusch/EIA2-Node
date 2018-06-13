"use strict";
const Mongo = require("mongodb");
let databaseURL = "mongodb://localhost:27017";
let databaseName = "test";
let databaseCollection = "students";
let db;
let students;
if (process.env.NODE_ENV == "production") {
    // databaseURL = "mongodb://username:password@hostname:port/database";
    databaseURL = "mongodb://admin:admin123@ds247310.mlab.com:47310/eia_node";
    databaseName = "eia_node";
}
Mongo.MongoClient.connect(databaseURL)
    .then((_db) => {
    console.log("Connected to database!");
    db = _db.db(databaseName);
    students = db.collection(databaseCollection);
})
    .catch((_e) => {
    console.error("Unable to connect to database, error: ", _e);
});
function insert(_student) {
    students.insertOne(_student, (_e) => {
        if (_e)
            console.log("Database insertion returned: " + _e);
    });
}
exports.insert = insert;
function find(_callback, _search) {
    let cursor;
    if (_search === "*") {
        cursor = students.find().toArray((_e, studentArray) => {
            if (_e)
                _callback("Error" + _e);
            else
                _callback(JSON.stringify(studentArray));
        });
    }
    else {
        cursor = students.find({ "matrikel": _search }).toArray((_e, studentArray) => {
            if (_e)
                _callback("Error" + _e);
            else
                _callback(JSON.stringify(studentArray));
        });
    }
}
exports.find = find;
//# sourceMappingURL=database.js.map