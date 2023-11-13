import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import {  pgEnum, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
// We difine the schema of our database here
export const methodEnum = pgEnum('method', ['GET', 'POST', 'PUT', 'DELETE'])
// serial defines auto incrementing integer
export const Proxies = pgTable('Proxies', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 256 }),
    url: varchar('url', { length: 256 }),
    method:methodEnum("method"),
    updateDate: timestamp('updateDate').defaultNow(),
});     

// Type Declaration of the schema
export type Proxy = typeof Proxies.$inferSelect; 
export type NewProxy = typeof Proxies.$inferInsert; 
