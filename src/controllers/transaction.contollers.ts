import { Router } from "express";
import prisma from "../prismaClient";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

// hanya bisa diakses jika login
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
