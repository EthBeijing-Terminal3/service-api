import { validateEnvVariable } from './configUtils';

export default {
  username: validateEnvVariable(process.env.POSTGRES_USER, 'ENV POSTGRES_USER is missing!', 'postgres'),
  password: validateEnvVariable(process.env.POSTGRES_PASSWORD, 'ENV POSTGRES_PASSWORD is missing!', 'postgres'),
  host: validateEnvVariable(process.env.POSTGRES_HOST, 'ENV POSTGRES_HOST is missing!', 'localhost'),
  database: validateEnvVariable(process.env.POSTGRES_DB_NAME, 'ENV POSTGRES_DB_NAME is missing!', 'extension_api_dev'),
  port: Number(validateEnvVariable(process.env.POSTGRES_PORT, 'ENV POSTGRES_PORT is missing!', '5432')),
  dialect: 'postgres',
  pool: { min: 0, max: 10 },
};
