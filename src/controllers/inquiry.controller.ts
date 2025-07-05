import { PrismaClient } from "../generated/prisma";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createInquiry = async (req: Request, res: Response) => {
  try {
    const { email, name, message, phone,propertyId } = req.body;
    const inquiry = await prisma.inquiries.create({
      data: {
        clientEmail: email,
        clientName: name,
        message,
        clientPhone: phone,
        propertyId,
        submittedAt: new Date(),
      }
    });
    res.status(201).json(inquiry);
  } catch (error) {
    console.log("Error creating inquiry:", error);
    res.status(500).json({ error: "Failed to create inquiry" });
  }
};
