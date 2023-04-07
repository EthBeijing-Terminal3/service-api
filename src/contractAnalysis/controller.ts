import {NextFunction, Request, Response} from "express";
import {logger} from "../utils/logger";
import {getDappInfo} from "./service";
import axios from "axios";
import {addToHistory, getHistory} from "../history/historyService";
import {chat} from "../conversationService";

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

class ContractAnalysis {
  public async getPromptHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { account_address, path, limit, offset } = req.body;

      const data = await getHistory(account_address, path || '', limit || DEFAULT_LIMIT, offset || DEFAULT_OFFSET);

      res.status(200).send(data);
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  public async chat(req: Request, res: Response, next: NextFunction) {
    try {
      const { account_address, message } = req.body;

      const data = await chat(account_address, message);
      await addToHistory(req.path, account_address, {content: message}, data);

      res.status(200).send(data);
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  public async contractInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const { contract_address, chain_id } = req.body;

      const data = await getDappInfo(chain_id, contract_address);

      if (req.body.account_address) {
        await addToHistory(req.path, req.body.account_address, {contract_address, chain_id}, data);
      }

      res.status(200).send(data);
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  public async contractAnalysis(req: Request, res: Response, next: NextFunction) {
    try {
      const { contract_address, chain_id } = req.body;

      if (["1", "56", "137", "43114"].indexOf(chain_id) === -1) {
        res.status(400).send({ message: `chain_id ${chain_id} not supported. chain_id must be one of ["1", "56", "137", "43114"]`})
        return;
      }

      const { data } = await axios.get(`https://api.gopluslabs.io/api/v1/token_security/${chain_id}?contract_addresses=${contract_address}`);
      const result = data.result && data.result[contract_address.toLowerCase()] ? data.result[contract_address.toLowerCase()] : data.result;

      if (req.body.account_address) {
        await addToHistory(req.path, req.body.account_address, {contract_address, chain_id}, result);
      }

      res.status(200).send(result);
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  public async transactionAnalysis(req: Request, res: Response, next: NextFunction) {
    try {
      const { origin_url, tx_data, from, to, gas, value, user_account } = req.body;

      const { data } = await axios.post('https://frontend.blowfish.xyz/proxy/api/ethereum/v0/mainnet/scan/transaction', {
        metadata: { origin: origin_url },
        txObject: { data: tx_data, from, to, gas, value },
        userAccount: user_account
      }, {
        headers: {
          'Content-Type': 'application/json',
          'authority': 'frontend.blowfish.xyz',
          'origin': 'frontend.blowfish.xyz',
          'Referer': 'https://protect.blowfish.xyz/',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
        }
      });

      await addToHistory(req.path, user_account, {origin_url, tx_data, from, to, gas, value, user_account}, data);

      res.status(200).send(data);
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }
}

export default ContractAnalysis;
