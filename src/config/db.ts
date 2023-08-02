import fs from "fs";
import sqlite3 from "sqlite3";
sqlite3.verbose();
const filepath = "./customers.db";

function connectToDatabase() {
    if (fs.existsSync(filepath)) {
        return new sqlite3.Database(filepath);
    } else {
        const db = new sqlite3.Database(filepath, (error: any) => {
            if (error) {
                return console.error(error.message);
            }
            createTable(db);
            console.log("Connected to the database successfully");
        });
        return db;
    }
}

function createTable(db: any) {
    db.exec(`
  CREATE TABLE customers
  (
    name       VARCHAR(50),
    city VARCHAR(20),
    country   VARCHAR(15),
    favorite_sport   VARCHAR(20)
  )
`);
}

export default connectToDatabase();
