import { validateEnvVariable } from './configUtils';

export default {
  port: validateEnvVariable(process.env.PORT, 'PORT is not defined', '4000'),
};
