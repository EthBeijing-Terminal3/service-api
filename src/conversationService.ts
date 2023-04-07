import axios from "axios";
import baseConfig from '../config/base';

interface Reply {
  action: string,
  parameters: string[],
  comment: string
}
export const chat = async (accountAddress: string, content: string): Promise<Reply> => {

  const { data } = await axios.post(baseConfig.chat_url, {
    wallet_address: accountAddress,
    prompt: content,
  }, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return data;
};
