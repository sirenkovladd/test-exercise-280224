import { Dispatcher, request } from "undici";
import { SystemError } from "../error";

async function parseBody(body: Dispatcher.ResponseData["body"]) {
  try {
    return await body.json();
  } catch (_error) {
    throw new SystemError("Failed to parse response from Bored");
  }
}

function isValidRecord(value: unknown): value is Record<string, unknown> {
  return value != null && typeof value === "object";
}

export class Bored {
  private url: string;

  constructor(activityUrl: string) {
    this.url = activityUrl;
  }

  async getActivity() {
    const response = await request(this.url);
    if (response.statusCode !== 200) {
      throw new SystemError("Failed to fetch activity from Bored");
    }
    const body = await parseBody(response.body);
    if (!isValidRecord(body)) {
      throw new SystemError("Invalid response from Bored");
    }
    return body;
  }
}
