import 'dotenv/config';
import type { Config } from 'drizzle-kit';
 
export default {
	schema: './db/schema.ts',
	out: './drizzle/migrations',
	driver: 'pg',
	dbCredentials: {
    host: process.env.POSTGRES_URL!,
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DATABASE!,
	},
} satisfies Config;

