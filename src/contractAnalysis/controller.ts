import {NextFunction, Request, Response} from "express";
import {logger} from "../utils/logger";
import {getDappInfo} from "./service";


class ContractAnalysis {
  public async analyzeContract(req: Request, res: Response, next: NextFunction) {
    try {
      const { contract_address, chain_id } = req.body;

      const data = await getDappInfo(chain_id, contract_address);
      // TODO: add analysis
      res.status(200).send(data);
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }
}

export default ContractAnalysis;
