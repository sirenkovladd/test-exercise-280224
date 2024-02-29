import { SystemError } from "../error";
import { Bored } from "../service/bored";

type BasicRecord = Record<string, unknown>;

export type ActivityResponse =
  | Record<string, unknown>
  | {
      price: string;
      accessibility: string;
    };

export class Activity {
  private bored: Bored;

  constructor(bored: Bored) {
    this.bored = bored;
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

  async getActivity(): Promise<ActivityResponse> {
    const result = await this.bored.getActivity();
    return {
      ...result,
      accessibility: this.mapAccessibility(result),
      price: this.mapPrice(result),
    };
  }
}
