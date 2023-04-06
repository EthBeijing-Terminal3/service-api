import { validationResult, body } from 'express-validator';
import {isEthAddress} from "./utils/utils";

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const err = errors.array();

    res.status(400).json({message: err[0].msg});
  };
};

export const contractAndChain = validate([
  body('contract_address').isString().custom(isEthAddress),
  body('chain_id').isString().trim(),
]);
