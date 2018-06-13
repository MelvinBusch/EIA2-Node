import * as Mongo from "mongodb";

let databaseURL: string = "mongodb://localhost:27017";
let databaseName: string = "test";
let databaseCollection: string = "students";
let db: Mongo.Db;
let students: Mongo.Collection;

if (process.env.NODE_ENV == "production") {
  // databaseURL = "mongodb://username:password@hostname:port/database";
  databaseURL = "mongodb://admin:admin123@ds247310.mlab.com:47310/eia_node";
  databaseName = "eia_node";
}

Mongo.MongoClient.connect(databaseURL)
  .then((_db: Mongo.Db) => {
    console.log("Connected to database!");
    db = _db.db(databaseName);
    students = db.collection(databaseCollection);
  })
  .catch((_e: Mongo.MongoError) => {
    console.error("Unable to connect to database, error: ", _e);
  });

export function insert(_student: Interfaces.Studi): void {
  students.insertOne(_student, (_e: Mongo.MongoError) => {
    if (_e)
      console.log("Database insertion returned: " + _e);
  });
}

export function find(_callback: Function, _search: string): void {
  let cursor: any;

  if (_search === "*") {
    cursor = students.find().toArray((_e: Mongo.MongoError, studentArray: Interfaces.Studi[]) => {
      if (_e)
        _callback("Error" + _e);
      else
        _callback(JSON.stringify(studentArray));
    });
  } else {
    cursor = students.find({"matrikel": _search}).toArray((_e: Mongo.MongoError, studentArray: Interfaces.Studi[]) => {
      if (_e)
        _callback("Error" + _e);
      else
        _callback(JSON.stringify(studentArray));
    });
  }

}