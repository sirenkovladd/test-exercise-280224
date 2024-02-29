import type { Config } from "../config";
import { Bored } from "./bored";
import { Database } from "./database";

export class Service {
  readonly bored: Bored;
  readonly db: Database;

  constructor(config: Config) {
    this.bored = new Bored(config.getActivityUrl());
    this.db = new Database(config.getDbFileName());
  }
}
