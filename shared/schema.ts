import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Simple profile table keyed by auth user id (UUID from Supabase)
export const profiles = pgTable("profiles", {
  id: text("id").primaryKey(), // matches Supabase auth user.id
  name: text("name"),
});

export type Profile = typeof profiles.$inferSelect;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
