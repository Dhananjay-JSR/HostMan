DO $$ BEGIN
 CREATE TYPE "method" AS ENUM('GET', 'POST', 'PUT', 'DELETE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Proxies" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(256),
	"url" varchar(256),
	"method" "method"
);
