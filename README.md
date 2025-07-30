# Hotel Management System

A full-stack hotel management web application similar to OYO platform, built with React, Express.js, and TypeScript.

## Features

- **Room Booking System**: Browse and book hotel rooms with detailed filtering options
- **Food Ordering**: Order meals with cart functionality and room delivery
- **Booking Management**: View and manage room reservations and food orders
- **Responsive Design**: Mobile-first design with modern UI components
- **Real-time Updates**: Dynamic data updates using React Query

## Tech Stack

### Frontend
- React 18 with TypeScript
- Wouter for routing
- TanStack Query for state management
- shadcn/ui components with Tailwind CSS
- Vite for build tooling

### Backend
- Express.js with TypeScript
- Drizzle ORM with PostgreSQL support
- In-memory storage for development
- RESTful API design

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd hotel-management
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utilities and config
│   │   └── hooks/        # Custom React hooks
├── server/               # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage layer
│   └── vite.ts           # Vite integration
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema definitions
└── components.json       # shadcn/ui configuration
```

## API Endpoints

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get specific room

### Food Items
- `GET /api/food-items` - Get all food items
- `GET /api/food-items/:id` - Get specific food item

### Room Bookings
- `GET /api/room-bookings` - Get all bookings
- `POST /api/room-bookings` - Create new booking
- `PATCH /api/room-bookings/:id/status` - Update booking status

### Food Orders
- `GET /api/food-orders` - Get all orders
- `POST /api/food-orders` - Create new order
- `PATCH /api/food-orders/:id/status` - Update order status

## Database Setup

The application uses Drizzle ORM with PostgreSQL. For production deployment:

1. Set up a PostgreSQL database
2. Update the database connection in `drizzle.config.ts`
3. Run migrations: `npm run db:push`

For development, the app uses in-memory storage with sample data.

## Environment Variables

Create a `.env` file for production:

```env
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=production
```

## Deployment

### Production Build

```bash
npm run build
npm start
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

### Vercel/Netlify Deployment

The frontend can be deployed separately by building the client:

```bash
npm run build:client
```

Then deploy the `dist/public` folder to your static hosting provider.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.