import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

const imageUrls = [
  // Interiors
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", // contemporary kitchen
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80", // bright hallway
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80", // lawn & facade
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80", // house front
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=600&q=80", // modern villa exterior
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80", // classic house exterior
  "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=600&q=80", // outdoor patio
];

// Property Management
export const listProperties = async (req: Request, res: Response) => {
  try {
    const { page, pageSize, filter } = req.body;

    const pipeline: any[] = [{ $match: { status: "Available" } }];

    if (filter?.location) {
      pipeline.push({
        $match: {
          location: { $regex: filter.location, $options: "i" },
        },
      });
    }
    if (filter?.type) {
      pipeline.push({ $match: { type: filter.type } });
    }
    if (filter?.minPrice || filter?.maxPrice) {
      const priceFilter: any = {};
      if (filter.minPrice) priceFilter.$gte = Number(filter.minPrice);
      if (filter.maxPrice) priceFilter.$lte = Number(filter.maxPrice);
      pipeline.push({ $match: { price: priceFilter } });
    }
    if (filter?.amenities?.length > 0) {
      pipeline.push({
        $match: {
          amenities: { $all: filter.amenities },
        },
      });
    }
    if (filter?.bedrooms) {
      pipeline.push({
        $match: { bedrooms: { $gte: Number(filter.bedrooms) } },
      });
    }
    if (filter?.bathrooms) {
      pipeline.push({
        $match: { bathrooms: { $gte: Number(filter.bathrooms) } },
      });
    }

    // Build Prisma where clause based on filters
    const where: any = { status: "Available" };

    if (filter?.location) {
      where.location = { contains: filter.location, mode: "insensitive" };
    }
    if (filter?.type) {
      where.type = filter.type;
    }
    if (filter?.minPrice || filter?.maxPrice) {
      where.price = {};
      if (filter.minPrice) where.price.gte = Number(filter.minPrice);
      if (filter.maxPrice) where.price.lte = Number(filter.maxPrice);
    }
    if (filter?.amenities?.length > 0) {
      where.amenities = { hasEvery: filter.amenities };
    }
    if (filter?.bedrooms) {
      where.bedrooms = { gte: Number(filter.bedrooms) };
    }
    if (filter?.bathrooms) {
      where.bathrooms = { gte: Number(filter.bathrooms) };
    }

    // Count total
    const total = await prisma.properties.count({ where });

    // Fetch paginated properties
    const properties = await prisma.properties.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: ((page || 1) - 1) * (pageSize || 10),
      take: pageSize || 10,
    });

    res.json({ total, properties });
  } catch (error) {
    res.status(500).json({ error: "Failed to list properties" });
  }
};

export const createProperty = async (req: Request, res: Response) => {
  try {
    if (!req.body.images || req.body.images.length === 0)
      req.body.images = imageUrls.map((url) => ({ url }));
    const property = await prisma.properties.create({ data: req.body });
    res.status(201).json(property);
  } catch (error) {
    console.log("Error creating property:", error);
    res.status(500).json({ error: `Failed to create property ${error}` });
  }
};

export const getProperty = async (req: Request, res: Response) => {
  try {
    const property = await prisma.properties.findUnique({
      where: { id: req.params.id },
    });
    if (!property) return res.status(404).json({ error: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: "Failed to get property" });
  }
};

export const updateProperty = async (req: Request, res: Response) => {
  try {
    const property = await prisma.properties.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: "Failed to update property" });
  }
};

export const deleteProperty = async (req: Request, res: Response) => {
  try {
    await prisma.properties.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete property" });
  }
};

export const archiveProperty = async (req: Request, res: Response) => {
  try {
    console.log("Archiving property", req.params.id);
    const property = await prisma.properties.update({
      where: { id: req.params.id },
      data: { status: "archived" },
    });
    res.json(property);
  } catch (error) {
    console.log("Error archiving property:", error);
    res.status(500).json({ error: "Failed to archive property" });
  }
};

export const listAminities = async (req: Request, res: Response) => {
  try {
    const properties = await prisma.properties.findMany();

    const aminities = properties.reduce((acc, property) => {
      if (property.amenities && Array.isArray(property.amenities)) {
        property.amenities.forEach((amenity) => {
          if (!acc.includes(amenity)) {
            acc.push(amenity);
          }
        });
      }
      return acc;
    }, [] as string[]);
    res.status(200).json(aminities);
  } catch (error) {
    res.status(500).json({ error: "Failed to list amenities" });
  }
};

// Client Management
export const listClients = async (req: Request, res: Response) => {
  try {
    const clients = await prisma.clients.findMany();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: "Failed to list clients" });
  }
};

export const getClient = async (req: Request, res: Response) => {
  try {
    const client = await prisma.clients.findUnique({
      where: { id: req.params.id },
    });
    if (!client) return res.status(404).json({ error: "Client not found" });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: "Failed to get client" });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const client = await prisma.clients.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: "Failed to update client" });
  }
};
