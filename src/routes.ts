import {Router} from "express";
import ContractAnalysis from "./contractAnalysis/controller";
import ContractDescription from "./contractDescription/controller";
import {contractAndChain, transaction} from "./validators";


const router = Router();

const analyzeController = new ContractAnalysis();
const descriptionController = new ContractDescription();

router.post('/contract/analyze', contractAndChain, analyzeController.contractAnalysis);
router.post('/contract/description', contractAndChain, descriptionController.getContractDescription);
router.post('/contract/info', contractAndChain, analyzeController.contractInfo);
router.post('/transaction/analyze', transaction, analyzeController.transactionAnalysis);

export default router;
