PropTrack Server

A RESTful API backend for a property management platform built with Node.js, Express, TypeScript, MongoDB, and Prisma.

Supports:

🏘️ Public property listings
🧑‍💼 Agent dashboards for managing properties, clients, and inquiries

🧱 Project Structure

prop-track-server/
🍜 prisma/               # Prisma schema
🍜 src/
    🍜 controllers/      # Route handlers
    🍜 routes/           # Express routes
    🍜 generated/        # Prisma-generated types
    🍜 index.ts          # App entry point
🍜 seed.ts               # Sample data generator
🍜 .env                  # Environment config
🍜 package.json
🍜 tsconfig.json

⚙️ Tech Stack

Node.js + Express.js
MongoDB via Mongoose
TypeScript
Prisma ORM


🔧 Getting Started
Prerequisites
Node.js (v16+)
MongoDB running locally or via MongoDB Atlas


Installation & Setup

git clone <repo-url>
cd prop-track-server
npm install

Create a .env file:
DATABASE_URL="mongodb+srv://proptrack_new:du4s2SKDLmZzLe7K@proptrack.fvlw0qm.mongodb.net/property-management?retryWrites=true&w=majority&ssl=true&connectTimeoutMS=5000"

Optional: Seed the DB with mock data

npx ts-node seed.ts

Start the server:

npm run dev

🔪 API Overview

Public Routes

GET /api/public/properties – List properties

GET /api/public/properties/:id – View property detail

POST /api/public/properties/:id/inquire – Submit inquiry

Agent Routes

GET /api/agent/properties – View/manage agent listings

GET /api/agent/inquiries – View inquiries

POST /api/agent/properties – Add new property



📝 Assumptions

No authentication required for MVP


⚒️ Technical Decisions

Express + TypeScript: Clean structure, robust typing
Prisma: Simple schema modeling
Mongoose: MongoDB querying and validation
Modular structure: For easier scaling


🚀 Future Enhancements

JWT-based authentication and role-based access
Cloud storage (S3) for image uploads
Add Redis caching
Real-time updates (Socket.io)
Admin dashboard UI
Unit & integration tests


⭐ Stretch Goals Achieved

Soft delete support for properties
Aggregated property filtering
Scalable architecture for 10,000+ records

⚠️ Shortcuts / Compromises

Minimal validation
No auth or file hosting
Logging/monitoring left out

⏱️ Time Spent

~02 - 04 hours

🧰 Tools & Resources

Node.js, Express.js
MongoDB,
Prisma
Postman
TypeScript
Cursor

🙌 Final Notes

Thank you for reviewing this assessment. The codebase is structured for clarity, scalability, and easy handoff. I’m happy to provide a live demo or walkthrough if needed.