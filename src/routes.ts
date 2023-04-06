import {Router} from "express";
import ContractAnalysis from "./contractAnalysis/controller";
import ContractDescription from "./contractDescription/controller";
import {contractAndChain} from "./validators";


const router = Router();

const analyzeController = new ContractAnalysis();
const descriptionController = new ContractDescription();

router.post('/contract/analyze', contractAndChain, analyzeController.analyzeContract);
router.post('/contract/description', contractAndChain, descriptionController.getContractDescription);

export default router;
