import "tsconfig-paths/register";
import { config } from "dotenv-defaults";
import { resolve } from "path";

config({
  defaults: resolve(__dirname, "./.env.default"),
});

import { Sequelize, Dialect } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";
import db from "./config/db";
import { logger } from "./src/utils/logger";

const { username, dialect, password, database, host, pool } = db;
const sequelize = new Sequelize({ username, password, dialect: dialect as Dialect, database, host, pool });

console.info("DB connection params: ", { username, dialect, password, database, host, pool });

const umzug = new Umzug({
  migrations: { glob: "migrations/*.ts" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => {
  // Checks migrations and run them if they are not already applied. To keep
  // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
  // will be automatically created (if it doesn't exist already) and parsed.
  try {
    await umzug.up();
  } catch (e) {
    logger.error(e)
    await umzug.down();
  }
})();

export type Migration = typeof umzug._types.migration;
export { sequelize };
