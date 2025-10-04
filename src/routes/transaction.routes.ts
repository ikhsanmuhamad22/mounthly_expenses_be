import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import prisma from "../prismaClient";

const router = Router();

router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  const transactions = await prisma.transaction.findMany({
    where: { userId: req.user.userId },
  });
  res.json(transactions);
});

router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  const { type, amount, note, category } = req.body;
  const transaction = await prisma.transaction.create({
    data: {
      type,
      amount,
      note,
      category,
      userId: req.user.userId,
    },
  });
  res.json(transaction);
});

export default router;
