import { SystemError } from "../error";
import { Bored } from "../service/bored";
import { User } from "./user";

type BasicRecord = Record<string, unknown>;

export type ActivityResponse =
  | Record<string, unknown>
  | {
      price: string;
      accessibility: string;
    };

export class Activity {
  private bored: Bored;
  private user: User;

  constructor(bored: Bored, user: User) {
    this.bored = bored;
    this.user = user;
  }

  private mapAccessibility(body: BasicRecord): string {
    const val = body.accessibility;
    if (typeof val !== "number") {
      throw new SystemError("Invalid accessibility value");
    }
    if (val <= 0.25) {
      return "High";
    }
    if (val <= 0.75) {
      return "Medium";
    }
    return "Low";
  }

  private mapPrice(body: BasicRecord): string {
    const val = body.price;
    if (typeof val !== "number") {
      throw new SystemError("Invalid price value");
    }
    if (val < 0) {
      throw new SystemError("Invalid price value (negative)");
    }
    if (val === 0) {
      return "Free";
    }
    if (val <= 0.5) {
      return "Low";
    }
    return "High";
  }

  async getActivity(user?: string): Promise<ActivityResponse> {
    const result = await this.bored.getActivity();
    if (user) {
      const userData = await this.user.getUser(user);
      if (userData) {
        return {
          ...result,
          accessibility: userData.accessibility,
          price: userData.price,
        };
      }
    }
    return {
      ...result,
      accessibility: this.mapAccessibility(result),
      price: this.mapPrice(result),
    };
  }
}
