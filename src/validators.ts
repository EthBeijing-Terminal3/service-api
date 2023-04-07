import { validationResult, body } from 'express-validator';
import {isEthAddress} from "./utils/utils";

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    console.log({errors: errors.array()})
    const err = errors.array();

    res.status(400).json({message: err[0].msg});
  };
};

export const contractAndChain = validate([
  body('contract_address', '`contract_address` must be a valid evm address').isString().custom(isEthAddress),
  body('chain_id', '`chain_id` must be a string').isString().trim(),
]);

export const transaction = validate([
  body('origin_url', `'origin_url' must ba a url`).isURL(),
  body('tx_data', `'tx_data' must be a string`).isString(),
  body('from', `'from' must be a valid evm address`).isString().custom(isEthAddress),
  body('to', `'to' must be a valid evm address`).isString().custom(isEthAddress),
  body('gas', `'gas' must be a string`).isString(),
  body('value', `'value' must be a string`).isString(),
  body('user_account', `'user_account' must be a valid evm address`).isString().custom(isEthAddress),
]);

export const history = validate([
  body('account_address', `'account_address' must be a valid evm address`).isString().custom(isEthAddress),
  body('limit', `'limit' must be a number`).optional({ nullable: true }).isInt({min: 1, max: 100}),
  body('offset', `'offset' must be a number`).optional({ nullable: true }).isInt({min: 1, max: 100}),
]);
