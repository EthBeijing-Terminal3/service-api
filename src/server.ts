import { logger } from './utils/logger';
import { createApp, start } from './app';

start(createApp()).catch(logger.error);
