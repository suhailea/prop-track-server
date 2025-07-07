import { PrismaClient } from "../generated/prisma";
import { Request, Response } from "express";
import { startOfDay, endOfDay } from "date-fns";

const prisma = new PrismaClient();

export const createInquiry = async (req: Request, res: Response) => {
  try {
    const { email, name, message, phone, propertyId } = req.body;
    const inquiry = await prisma.inquiries.create({
      data: {
        clientEmail: email,
        clientName: name,
        message,
        clientPhone: phone,
        propertyId,
        submittedAt: new Date(),
      },
    });
    res.status(201).json(inquiry);
  } catch (error) {
    console.log("Error creating inquiry:", error);
    res.status(500).json({ error: "Failed to create inquiry" });
  }
};

export const getSchedules = async (req: Request, res: Response) => {
  try {
    const { date } = req.body;

    const targetDate = new Date(date);
    const dayStart = startOfDay(targetDate);
    const dayEnd = endOfDay(targetDate);

    const schedules = await prisma.viewings.findMany({
      where: {
        viewingDate: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
      include: {
        client: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
      },
    });
    res.status(200).json(schedules);
  } catch (error) {
    console.log("Error fetching inquiries:", error);
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
};
