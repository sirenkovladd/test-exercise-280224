import type { Service } from "../service";
import { Activity } from "./activity";
import { User } from "./user";

export class Model {
  readonly activity: Activity;
  readonly user: User;

  constructor(service: Service) {
    this.activity = new Activity(service.bored);
    this.user = new User(service.db);
  }
}
