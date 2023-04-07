import { validateEnvVariable } from './configUtils';

export default {
  port: validateEnvVariable(process.env.PORT, 'PORT is not defined', '4000'),
  ethScanApiKeys: {
    ethMainnet: validateEnvVariable(process.env.ETH_MAINNET_API_KEY, 'ETH_MAINNET_API_KEY is not defined', ''),
    bscMainnet: validateEnvVariable(process.env.BSC_MAINNET_API_KEY, 'BSC_MAINNET_API_KEY is not defined', ''),
  },
  chat_url: validateEnvVariable(process.env.CHAT_API_URL, 'CHAT_API_URL in not defined', ''),
};
