import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import 'dotenv/config';

import * as schema from '@shared/schema';

// Configure Neon to use WebSocket (required for serverless)
neonConfig.webSocketConstructor = ws;

// Ensure DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL must be set. Did you forget to provision a database?',
  );
}

// Create DB connection pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize Drizzle with the pool and schema
export const db = drizzle(pool, { schema });
