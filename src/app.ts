import { config } from 'dotenv-defaults';
import { resolve } from 'path';
import { sequelize, connectionParams } from './db';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json';
import router from './routes';

config({
  defaults: resolve(__dirname, '../.env.default'),
});

import express, { Express } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import pc from 'picocolors';

import { logger } from './utils/logger';
import baseConfig from '../config/base';

const initFunction = async () => {};

export function createApp() {
  const app = express();
  app.use(morgan('combined'));
  app.use(express.json());
  app.use(compression());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
  return app;
}

export async function start(app: Express) {
  await sequelize.authenticate({
    retry: {
      max: 5,
    },
  });
  logger.success('Database running at', pc.magenta(`http://${connectionParams.host}:5432`));

  app.get('/', (_, res) => res.json('Extension API OK'));

  app.use(router);

  // Swagger docs
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  await initFunction();

  if (process.env.NODE_ENV !== 'test') {
    app.listen(baseConfig.port, () => {
      logger.success(pc.yellow(`Extension API is running on port ${pc.green(`${baseConfig.port}`)}`));
    });
  }

  return app;
}
