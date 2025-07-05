import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();

export const listProperties = async (req: Request, res: Response) => {
  try {
    const properties = await prisma.properties.findMany();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list properties' });
  }
};

export const getProperty = async (req: Request, res: Response) => {
  try {
    const property = await prisma.properties.findUnique({
      where: { id: req.params.id },
    });
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get property' });
  }
};

export const inquireProperty = async (req: Request, res: Response) => {
  try {
    const { clientEmail, clientName, clientPhone, message } = req.body;
    const inquiry = await prisma.inquiries.create({
      data: {
        clientEmail,
        clientName,
        clientPhone,
        message,
        propertyId: req.params.id,
        submittedAt: new Date(),
      },
    });
    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
};

export const searchProperties = async (req: Request, res: Response) => {
  try {
    // Example: filter by city, price, bedrooms, etc.
    const { city, minPrice, maxPrice, bedrooms } = req.query;
    const filters: any = {};
    if (city) filters['location.city'] = city;
    if (bedrooms) filters.bedrooms = Number(bedrooms);
    if (minPrice || maxPrice) filters.price = {};
    if (minPrice) filters.price.gte = Number(minPrice);
    if (maxPrice) filters.price.lte = Number(maxPrice);
    const properties = await prisma.properties.findMany({ where: filters });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search properties' });
  }
};

export const getFilters = async (req: Request, res: Response) => {
  try {
    // Example: get unique cities, types, statuses, etc.
    const cities = await prisma.properties.findMany({
      // distinct: ['location.city'],
      select: { location: true },
    });
    const types = await prisma.properties.findMany({
      distinct: ['type'],
      select: { type: true },
    });
    const statuses = await prisma.properties.findMany({
      distinct: ['status'],
      select: { status: true },
    });
    res.json({
      cities: cities.map((p) => p.location.city),
      types: types.map((p) => p.type),
      statuses: statuses.map((p) => p.status),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get filters' });
  }
}; 