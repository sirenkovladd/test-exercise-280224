import type net from "node:http";
import express from "express";
import type { Controller } from "../controller";

export class Server {
  private controller: Controller;

  constructor(controller: Controller) {
    this.controller = controller;
  }

  getApp() {
    const app = express();

    this.controller.initRoutes(app);

    return app;
  }

  start(port: string | number) {
    const app = this.getApp();

    let resolve: (net: net.Server) => void;
    const promise = new Promise<net.Server>((res) => {
      resolve = res;
    });
    const net = app.listen(port, () => {
      resolve(net);
    });

    return promise;
  }
}
