import {NextFunction, Request, Response} from "express";
import {logger} from "../utils/logger";
import {getDappInfo} from "./service";
import axios from "axios";

class ContractAnalysis {
  public async contractInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const { contract_address, chain_id } = req.body;

      const data = await getDappInfo(chain_id, contract_address);

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

      res.status(200).send(data.result && data.result[contract_address.toLowerCase()] ? data.result[contract_address.toLowerCase()] : data.result);
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }
}

export default ContractAnalysis;
