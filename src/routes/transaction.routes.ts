import { Router } from "express";
import {
  createTransaction,
  getTransactions,
} from "../controllers/transaction.contollers";

const router = Router();

router.get("/", getTransactions);
router.post("/", createTransaction);

export default router;
