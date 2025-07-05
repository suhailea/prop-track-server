import { PrismaClient } from './src/generated/prisma';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const imageUrls = [
  // Interiors
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", // contemporary kitchen
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80", // bright hallway

  // Exteriors
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80", // lawn & facade
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80", // house front
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=600&q=80", // modern villa exterior
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80", // classic house exterior


  // Mixed Exterior/Interior
  "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=600&q=80", // outdoor patio
];


const getRandomImageUrls = () => faker.helpers.arrayElements(imageUrls, { min: 3, max: 7 });

async function seed() {
  // 1. Update existing Properties
  const allProperties = await prisma.properties.findMany();
  for (const property of allProperties) {
    await prisma.properties.update({
      where: { id: property.id },
      data: {
        images: getRandomImageUrls(),
      },
    });
  }
  console.log("✅ Seed complete");
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
