import { Config } from "./config";
import { Controller } from "./controller";
import { Model } from "./model";
import { Server } from "./server";
import { Service } from "./service";

async function main() {
  const config = new Config();
  const service = new Service(config);
  const model = new Model(service);
  const controller = new Controller(model);
  const server = new Server(controller);

  const port = config.getPort();
  await server.start(port);
  console.info(`Server started at http://localhost:${port}`);

  // setInterval(async () => {
  //   try {
  //     console.info("Active accounts");
  //     const account = await service.db.runQuery("select * from account", []);
  //     console.info(account);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, 1000);
}

main();
