import axios from "axios";
import baseConfig from '../../config/base';

export const getDappInfo = async (chainId: string, contractAddress: string) => {

  switch (chainId) {
    case '1':
      return ethMainnetContractInfo(contractAddress);
    default:
      throw new Error('Chain not supported');
  }
};

const ethMainnetContractInfo = async (contractAddress: string) => {
  const res = await axios.get(`https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${baseConfig.ethScanApiKeys.ethMainnet}`, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return res.data.result[0];
}
