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

// Generate fake client data
const generateFakeClient = () => ({
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  createdAt: faker.date.past(),
});

async function seed() {
  console.log("🔧 Starting database seed...");

  // 1. Update existing Properties with images
  console.log("📸 Updating properties with images...");
  // 2. Fix invalid clientId references in viewings table
  console.log("🔧 Fixing invalid clientId references in viewings...");
  
  // Get all viewings
  const allViewings = await prisma.viewings.findMany();
  console.log(`Found ${allViewings.length} viewings`);

  // Get all existing clients
  const existingClients = await prisma.clients.findMany();
  console.log(`Found ${existingClients.length} existing clients`);

  // Create a map of existing client IDs for quick lookup
  const existingClientIds = new Set(existingClients.map(client => client.id));

  // Find viewings with invalid clientId references
  const viewingsWithInvalidClientIds = allViewings.filter(
    viewing => !existingClientIds.has(viewing.clientId)
  );

  console.log(`Found ${viewingsWithInvalidClientIds.length} viewings with invalid clientId references`);

  if (viewingsWithInvalidClientIds.length > 0) {
    // Create missing clients for invalid clientIds
    const clientsToCreate = viewingsWithInvalidClientIds.map(viewing => ({
      id: viewing.clientId, // Use the existing clientId as the new client's ID
      ...generateFakeClient(),
    }));

    console.log(`Creating ${clientsToCreate.length} missing clients...`);
    
    for (const clientData of clientsToCreate) {
      try {
        await prisma.clients.create({
          data: clientData,
        });
      } catch (error) {
        console.log(`⚠️ Client with ID ${clientData.id} already exists or error occurred:`, error);
      }
    }

    console.log("✅ Created missing clients for invalid clientId references");
  } else {
    console.log("✅ All viewings have valid clientId references");
  }

  // 3. Update viewingDate for all viewings to be between July 1-10, 2025
  console.log("📅 Updating viewing dates to July 1-10, 2025...");
  
  const startDate = new Date('2025-07-01');
  const endDate = new Date('2025-07-10');
  
  for (const viewing of allViewings) {
    const randomDate = faker.date.between({ from: startDate, to: endDate });
    await prisma.viewings.update({
      where: { id: viewing.id },
      data: {
        viewingDate: randomDate,
      },
    });
  }
  
  console.log(`✅ Updated viewing dates for ${allViewings.length} viewings`);

  // 4. Verify the fix by checking if all viewings now have valid clientId references
  const finalViewings = await prisma.viewings.findMany();
  const finalClients = await prisma.clients.findMany();
  const finalClientIds = new Set(finalClients.map(client => client.id));
  
  const remainingInvalidViewings = finalViewings.filter(
    viewing => !finalClientIds.has(viewing.clientId)
  );

  if (remainingInvalidViewings.length === 0) {
    console.log("✅ All viewings now have valid clientId references");
  } else {
    console.log(`⚠️ Warning: ${remainingInvalidViewings.length} viewings still have invalid clientId references`);
  }

  console.log("🎉 Seed complete!");
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
