import {Router} from "express";
import ContractAnalysis from "./contractAnalysis/controller";
import ContractDescription from "./contractDescription/controller";


const router = Router();

const analyzeController = new ContractAnalysis();
const descriptionController = new ContractDescription();

router.post('/contract/analyze', analyzeController.analyzeContract);
router.post('/contract/description', descriptionController.getContractDescription);

export default router;
