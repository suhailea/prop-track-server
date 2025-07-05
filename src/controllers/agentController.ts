import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

// Property Management
export const listProperties = async (req: Request, res: Response) => {
  try {
    const { page, pageSize, filter } = req.body;
    console.log("Listing properties", page, pageSize, filter);

    // Build dynamic where object
    const where: any = {};
    where.status = "Available"; // Only list active properties
    if (filter) {
      if (filter.location) {
        where.location = { contains: filter.location, mode: "insensitive" };
      }
      if (filter.type) {
        where.type = filter.type;
      }
      if (filter.minPrice || filter.maxPrice) {
        where.price = {};
        if (filter.minPrice) where.price.gte = Number(filter.minPrice);
        if (filter.maxPrice) where.price.lte = Number(filter.maxPrice);
      }
      if (
        filter.amenities &&
        Array.isArray(filter.amenities) &&
        filter.amenities.length > 0
      ) {
        where.amenities = { hasEvery: filter.amenities };
      }
      if (filter.bedrooms) {
        where.bedrooms = { gte: Number(filter.bedrooms) };
      }
      if (filter.bathrooms) {
        where.bathrooms = { gte: Number(filter.bathrooms) };
      }
    }

    const [count, properties] = await Promise.all([
      prisma.properties.count({ where }),
      prisma.properties.findMany({
        where,
        skip: page
          ? (parseInt(page as string) - 1) *
            (parseInt(pageSize as string) || 10)
          : 0,
        take: pageSize ? parseInt(pageSize as string) : 10,
        orderBy: { createdAt: "desc" },
      }),
    ]);
    res.json({ total: count, properties });
  } catch (error) {
    res.status(500).json({ error: "Failed to list properties" });
  }
};

export const createProperty = async (req: Request, res: Response) => {
  try {
    const property = await prisma.properties.create({ data: req.body });
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ error: "Failed to create property" });
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
    const property = await prisma.properties.update({
      where: { id: req.params.id },
      data: { status: "archived" },
    });
    res.json(property);
  } catch (error) {
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
// export const updateClientStatus = async (req: Request, res: Response) => {
//   try {
//     const client = await prisma.clients.update({ where: { id: req.params.id }, data: { status: req.body.status } });
//     res.json(client);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update client status' });
//   }
// };

// Viewing Management
export const listViewings = async (req: Request, res: Response) => {
  try {
    const viewings = await prisma.viewings.findMany();
    res.json(viewings);
  } catch (error) {
    res.status(500).json({ error: "Failed to list viewings" });
  }
};
export const createViewing = async (req: Request, res: Response) => {
  try {
    const viewing = await prisma.viewings.create({ data: req.body });
    res.status(201).json(viewing);
  } catch (error) {
    res.status(500).json({ error: "Failed to create viewing" });
  }
};
export const updateViewing = async (req: Request, res: Response) => {
  try {
    const viewing = await prisma.viewings.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(viewing);
  } catch (error) {
    res.status(500).json({ error: "Failed to update viewing" });
  }
};
export const updateViewingStatus = async (req: Request, res: Response) => {
  try {
    const viewing = await prisma.viewings.update({
      where: { id: req.params.id },
      data: { status: req.body.status },
    });
    res.json(viewing);
  } catch (error) {
    res.status(500).json({ error: "Failed to update viewing status" });
  }
};

// Inquiry Management
export const listInquiries = async (req: Request, res: Response) => {
  try {
    const inquiries = await prisma.inquiries.findMany();
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ error: "Failed to list inquiries" });
  }
};
export const getInquiry = async (req: Request, res: Response) => {
  try {
    const inquiry = await prisma.inquiries.findUnique({
      where: { id: req.params.id },
    });
    if (!inquiry) return res.status(404).json({ error: "Inquiry not found" });
    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ error: "Failed to get inquiry" });
  }
};
export const respondToInquiry = async (req: Request, res: Response) => {
  try {
    // Example: add a response field or update status (not in schema, so just echo for now)
    res.json({ message: "Responded to inquiry", id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to respond to inquiry" });
  }
};
