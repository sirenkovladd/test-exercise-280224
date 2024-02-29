import sqlite3 from "sqlite3";

export class Database {
  private db: sqlite3.Database;

  constructor(filename: string) {
    this.db = new sqlite3.Database(filename);

    this.db.run(
      `CREATE TABLE account (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      accessibility TEXT NOT NULL,
      price TEXT NOT NULL
    );`,
      (err) => {
        if (err) {
          console.error(err);
        }
      },
    );
  }

  runQuery<T>(query: string, params: unknown[]) {
    return new Promise<T[]>((resolve, reject) => {
      this.db.all<T>(query, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  close() {
    this.db.close();
  }
}
