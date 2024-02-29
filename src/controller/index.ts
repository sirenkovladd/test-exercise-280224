import express from "express";
import { SystemError, UserError } from "../error";
import type { Model } from "../model";

export class Controller {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  private getTextFromError(error: unknown): [string, number] {
    if (error instanceof SystemError) {
      return ["Internal server error", error.code];
    }
    if (error instanceof UserError) {
      return [error.message, error.code];
    }
    return ["Internal server error", 500];
  }

  private getUser(req: express.Request): string | undefined {
    const user = req.query.user;
    if (typeof user === "string") {
      return user;
    }
    return undefined;
  }

  initRoutes(app: express.Express) {
    app.get("/activity", async (req, res) => {
      try {
        const user = this.getUser(req);
        const activity = await this.model.activity.getActivity(user);
        res.json(activity);
      } catch (error) {
        console.error("activity", error);
        const [message, code] = this.getTextFromError(error);
        res.status(code).json({ error: message });
      }
    });

    app.post("/user", express.json(), async (req, res) => {
      try {
        const { name, accessibility, price } = req.body;
        if (typeof name !== "string") {
          throw new UserError("name is required", 400);
        }
        if (typeof accessibility !== "string") {
          throw new UserError("accessibility is required", 400);
        }
        if (!["Low", "Medium", "High"].includes(accessibility)) {
          throw new UserError(
            "accessibility must be Low, Medium, or High",
            400,
          );
        }
        if (typeof price !== "string") {
          throw new UserError("price is required", 400);
        }
        if (!["Free", "Low", "High"].includes(price)) {
          throw new UserError("price must be Free, Low, or High", 400);
        }
        await this.model.user.saveUser(name, accessibility, price);
        res.status(201).send({ name, accessibility, price });
      } catch (error) {
        console.error("saveUser", error);
        const [message, code] = this.getTextFromError(error);
        res.status(code).json({ error: message });
      }
    });
  }
}
