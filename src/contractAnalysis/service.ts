import axios from "axios";
import baseConfig from '../../config/base';

export const getDappInfo = async (chainId: string, contractAddress: string) => {

  switch (chainId) {
    case '1':
      return ethMainnetContractInfo(contractAddress);
    case '56':
      return bscMainnetContractInfo(contractAddress);
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

const bscMainnetContractInfo = async (contractAddress: string) => {
  const res = await axios.get(`https://api.bscscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${baseConfig.ethScanApiKeys.bscMainnet}`, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return res.data.result[0];
};
