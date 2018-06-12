"use strict";
const Mongo = require("mongodb");
let databaseURL = "mongodb://localhost:27017";
let databaseName = "Test";
let db;
let students;
if (process.env.NODE_ENV == "production") {
    // databaseURL = "mongodb://username:password@hostname:port/database";
    databaseURL = "mongodb://admin:admin123@ds247310.mlab.com:47310/eia_node";
    databaseName = "eia_node";
}
/*
Mongo.MongoClient.connect(databaseURL, (_e: Mongo.MongoError, _db: Mongo.Db) => {
  if (_e)
    console.error("Unable to connect to database, error: ", _e);
  else {
    console.log("Connected to database!");
    db = _db.db(databaseName);
    students = db.collection("students");
  }
});*/
Mongo.MongoClient.connect(databaseURL)
    .then((_db) => {
    console.log("Connected to database!");
    db = _db.db(databaseName);
    students = db.collection("students");
})
    .catch((_e) => {
    console.error("Unable to connect to database, error: ", _e);
});
function insert(_student) {
    students.insertOne(_student, (_e) => {
        if (_e)
            console.error("Database insertion returned -> " + _e);
    });
}
exports.insert = insert;
function refresh() {
    let cursor = students.find();
    let result;
    cursor.toArray((_e, _result) => {
        if (_e)
            result = "Error" + _e;
        else
            result = JSON.stringify(_result);
    });
    return result;
}
exports.refresh = refresh;
function search(_matrikel) {
    return JSON.stringify(students.find({ "matrikel": _matrikel }));
}
exports.search = search;
//# sourceMappingURL=database.js.map