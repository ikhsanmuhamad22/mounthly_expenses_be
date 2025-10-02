import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { note, amount, category } = req.body;
    const newTx = await prisma.transaction.create({
      data: { note, amount: parseFloat(amount), category },
    });
    res.json(newTx);
  } catch (error) {
    res.status(500).json({ error: "Failed to create transaction" });
  }
};
