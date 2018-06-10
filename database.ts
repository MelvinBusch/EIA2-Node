import * as Mongo from "mongodb";

let databaseURL: string = "mongodb://localhost:27017";
let databaseName: string = "Test";
let db: Mongo.Db;
let students: Mongo.Collection;

if (process.env.NODE_ENV == "production") {
  // databaseURL = "mongodb://username:password@hostname:port/database";
  databaseURL = "mongodb://admin:admin123@ds247310.mlab.com:47310/eia_node";
  databaseName = "eia_node";
}

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
    if (_e)
      console.error("Database refresh returned: " + _e);
  });
}

export function refresh(): string {
  let cursor: Mongo.Cursor = students.find();
  let result: string;
  cursor.toArray((_e: Mongo.MongoError, _result: Interfaces.Studi[]) => {
    if (_e)
      result =  "Error" + _e;
    else
      result =  JSON.stringify(_result);
  });
  return result;
}

export function search(_matrikel: string): string {
  return JSON.stringify(students.find({"matrikel": _matrikel}));
}