import inject from "light-my-request";
import t from "tap";
import { Controller } from "../controller";
import { Model } from "../model";
import { Server } from "../server";
import { Service } from "../service";

class MockService {
  private mockedValue;
  private mockedValueDb;

  constructor(values: any, dbResult?: any) {
    this.mockedValue = values;
    this.mockedValueDb = dbResult;
  }

  bored = {
    getActivity: async () => {
      return this.mockedValue;
    },
  };

  db = {
    runQuery: async () => {
      return this.mockedValueDb;
    },
  };
}

function createServer(resolveValue: any, users?: any[]) {
  const service = new MockService(resolveValue, users) as unknown;
  const model = new Model(service as Service);
  const controller = new Controller(model);
  const server = new Server(controller);

  return server.getApp();
}

t.test("activity OK", async (t) => {
  const value = {
    activity: "Learn Express.js",
    accessibility: 0.25,
    type: "education",
    participants: 1,
    price: 0.1,
    link: "https://expressjs.com/",
    key: "3943506",
  };
  const server = createServer(value);

  const response = await inject(server, {
    method: "GET",
    url: "/activity",
  });

  t.equal(response.statusCode, 200);
  t.match(response.json(), {
    ...value,
    accessibility: "High",
    price: "Low",
  });
  t.end();
});

t.test("user OK", async (t) => {
  const value = {
    name: "John",
    accessibility: "High",
    price: "Free",
  };
  const server = createServer(value);

  const response = await inject(server, {
    method: "POST",
    url: "/user",
    payload: value,
  });

  t.equal(response.statusCode, 201);
  t.match(response.json(), value);
  t.end();
});

t.test("get activity with created User", async (t) => {
  const value = {
    activity: "Learn Express.js",
    type: "education",
    participants: 1,
    link: "https://expressjs.com/",
    key: "3943506",
  };
  const user = {
    name: "John",
    accessibility: "High",
    price: "Free",
  };
  const server = createServer(value, [user]);

  await inject(server, {
    method: "POST",
    url: "/user",
    payload: user,
  });

  const response = await inject(server, {
    method: "GET",
    url: `/activity?user=${user.name}`,
  });

  t.equal(response.statusCode, 200);
  t.match(response.json(), {
    ...value,
    accessibility: user.accessibility,
    price: user.price,
  });
  t.end();
});
