import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

// Projeto/Conteúdo
// Valid categories enum
export const projectCategories = ["gaming", "agriculture", "photography", "development"] as const;
export type ProjectCategory = typeof projectCategories[number];

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  category: text("category").notNull(), // must be one of projectCategories
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  externalUrl: text("external_url"),
  featured: boolean("featured").default(false),
  order: text("order").default("0"), // numeric string for sorting
});

// Mensagens de contato
export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Sobre/Bio
export const aboutContent = pgTable("about_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  content: text("content").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
}).extend({
  category: z.enum(projectCategories, { 
    errorMap: () => ({ message: "Categoria deve ser: gaming, agriculture, photography ou development" })
  }),
  order: z.string().regex(/^\d+$/, "Order deve ser um número em formato string").optional(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  email: z.string().email("Email inválido").max(255, "Email muito longo"),
  subject: z.string().min(3, "Assunto deve ter pelo menos 3 caracteres").max(200, "Assunto muito longo"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres").max(5000, "Mensagem muito longa"),
  honeypot: z.string().optional(),
});

export const insertAboutContentSchema = createInsertSchema(aboutContent).omit({
  id: true,
  lastUpdated: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertAboutContent = z.infer<typeof insertAboutContentSchema>;
export type AboutContent = typeof aboutContent.$inferSelect;

// Weapon Likes
export interface WeaponLike {
  weaponId: string;
  likes: number;
}
