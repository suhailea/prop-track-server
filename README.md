# PropTrack Server

A backend API for a real estate listings and client management platform, supporting both public property search and agent dashboard features.

## Project Structure

```
prop-track-server/
├── package.json
├── package-lock.json
├── README.md
├── seed.ts
├── tsconfig.json
├── prisma/
│   └── schema.prisma
└── src/
    ├── controllers/
    │   ├── agentController.ts
    │   ├── inquiry.controller.ts
    │   └── publicController.ts
    ├── generated/
    ├── index.ts
    └── routes/
        ├── agent.ts
        ├── index.ts
        ├── inquiry.ts
        └── public.ts
```

## Tech Stack

- **Node.js** + **Express.js** (API server)
- **MongoDB** (database, via Mongoose ODM)
- **Prisma** (schema management)
- **TypeScript** (type safety)

## Features

- Public property search with advanced filters and pagination
- Agent dashboard for managing properties, clients, viewings, and inquiries
- RESTful API design with clear separation of concerns
- Scalable to 10,000+ property listings

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or remote instance)

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd prop-track-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy and edit as needed:
     ```
     DATABASE_URL=mongodb://localhost:27017/proptrack
     ```

4. (Optional) Seed the database:
   ```bash
   npx ts-node seed.ts
   ```

### Running the Server

```bash
npm run dev
```
or
```bash
npx ts-node src/index.ts
```

## API Overview

- **Public Endpoints:** `/api/public/properties`, `/api/public/properties/:id`, `/api/public/properties/:id/inquire`, etc.
- **Agent Endpoints:** `/api/agent/properties`, `/api/agent/clients`, `/api/agent/viewings`, `/api/agent/inquiries`, etc.

See the full API specification in the Product Requirements Document (PRD) or below.

## Development

- Source code in `src/`
- Controllers in `src/controllers/`
- Routes in `src/routes/`
- Prisma schema in `prisma/schema.prisma`

## How to Run the App from Scratch

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd prop-track-server
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory with:
     ```
     DATABASE_URL=mongodb://localhost:27017/proptrack
     ```
4. **(Optional) Seed the database:**
   ```bash
   npx ts-node seed.ts
   ```
5. **Start the development server:**
   ```bash
   npm run dev
   ```
   or
   ```bash
   npx ts-node src/index.ts
   ```

## Screenshots & Demo

> _Add screenshots of the main views here. If you have a video demo, link it or embed a GIF._

- ![Public Property Search](screenshots/public-search.png)
- ![Agent Dashboard](screenshots/agent-dashboard.png)
- [Video Demo (optional)](link-to-demo)

## Assumptions Made

- MongoDB is running locally on the default port.
- No authentication is required for MVP endpoints.
- File uploads are stored locally (not in cloud storage).
- Agents and clients are managed via API only (no admin UI).
- The app is run in a development environment.

## Technical Choices & Rationale

- **Node.js + Express.js:** Popular, well-supported, and fast for building REST APIs.
- **MongoDB with Mongoose:** Flexible schema for evolving requirements and fast querying for large datasets.
- **TypeScript:** Type safety and better developer experience.
- **Prisma:** For schema management and future extensibility.
- **Modular Structure:** Clear separation of controllers, routes, and models for maintainability.

## Future Plans & Improvements

- Add authentication and role-based authorization (JWT).
- Implement advanced search with AI recommendations.
- Integrate Redis for caching and performance.
- Add real-time notifications (e.g., for new inquiries or viewings).
- Move file storage to a cloud provider (e.g., AWS S3).
- Add comprehensive test coverage (unit, integration, E2E).
- Build a web-based admin dashboard for agents.

## Stretch Goals & Bonus Features

- Implemented soft delete for properties (archiving instead of hard delete).
- Added aggregation pipelines for efficient property search.
- Designed for scalability to 10,000+ listings.
- Provided a seed script for easy local setup.

## Shortcuts & Compromises

- Minimal error handling and validation for MVP endpoints.
- No authentication/authorization in the initial version.
- No production-ready logging or monitoring.
- File uploads are local only (no CDN or cloud storage).

## Time Spent

> _Total time spent: **X hours** (please fill in your actual time)_

## Resources, Tools, & Technologies Used

- Node.js, Express.js
- MongoDB, Mongoose
- TypeScript
- Prisma
- Postman (for API testing)
- VSCode
- [Any other tools you used]

## Additional Notes

- The project is designed for easy extensibility and future enhancements.
- Please reach out if you have any questions or need a walkthrough.

