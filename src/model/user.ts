import { Database } from "../service/database";

export class User {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async saveUser(name: string, accessibility: string, price: string) {
    const query =
      "INSERT INTO account (name, accessibility, price) VALUES (?, ?, ?);";
    await this.db.runQuery(query, [name, accessibility, price]);
  }
}
