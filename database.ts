import * as Mongo from "mongodb";

let databaseURL: string = "mongodb://localhost:27017";
let databaseName: string = "Test";
let db: Mongo.Db;
let students: Mongo.Collection;

if (process.env.NODE_ENV == "production") {
  // databaseURL = "mongodb://username:password@hostname:port/database";
  databaseURL = "mongodb://testuser:testpassword@ds129532.mlab.com:29532/eia2";
  databaseName = "eia2";
}

// handleConnect wird aufgerufen wenn der Versuch, die Connection zur Datenbank herzustellen, erfolgte
Mongo.MongoClient.connect(databaseURL, (_e: Mongo.MongoError, _db: Mongo.Db) => {
  if (_e)
    console.error("Unable to connect to database, error: ", _e);
  else {
    console.log("Connected to database!");
    db = _db.db(databaseName);
    students = db.collection("students");
  }
});

export function insert(_student: Interfaces.Studi): void {
  students.insertOne(_student, (_e: Mongo.MongoError) => {
    console.log("Database insertion returned: " + _e);
  });
}

export function refresh(_callback: Function): void {
  var cursor: Mongo.Cursor = students.find();
  cursor.toArray((_e: Mongo.MongoError, _result: Interfaces.Studi[]) => {
    if (_e)
      _callback("Error" + _e);
    else
      _callback(JSON.stringify(_result));
  });
}