import {Router} from "express";
import ContractAnalysis from "./contractAnalysis/controller";
import {contractAndChain, history, transaction} from "./validators";


const router = Router();

const analyzeController = new ContractAnalysis();

router.post('/contract/analyze', contractAndChain, analyzeController.contractAnalysis);
router.post('/contract/info', contractAndChain, analyzeController.contractInfo);
router.post('/transaction/analyze', transaction, analyzeController.transactionAnalysis);

router.post('/history', history, analyzeController.getPromptHistory);

export default router;
