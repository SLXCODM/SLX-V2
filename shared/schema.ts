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

export const insertAboutContentSchema = createInsertSchema(aboutContent).omit({
  id: true,
  lastUpdated: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertAboutContent = z.infer<typeof insertAboutContentSchema>;
export type AboutContent = typeof aboutContent.$inferSelect;

// Weapon Likes (persisted to PostgreSQL)
export const weaponLikes = pgTable("weapon_likes", {
  weaponId: varchar("weapon_id").primaryKey(),
  likes: text("likes").default("0").notNull(), // numeric string to avoid decimals
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export interface WeaponLike {
  weaponId: string;
  likes: number;
}

// Produtos da Loja
export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(), // em centavos para evitar decimais
  imageUrl: text("image_url"),
  category: text("category").notNull(), // digital, preset, course, etc
  featured: boolean("featured").default(false),
  active: boolean("active").default(true),
  stripeProductId: text("stripe_product_id"),
  stripePriceId: text("stripe_price_id"),
  order: text("order").default("0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
  stripeProductId: true,
  stripePriceId: true,
}).extend({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(200),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres").max(2000),
  price: z.string().regex(/^\d+$/, "Preço deve ser um número em centavos"),
  category: z.string().min(3),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
  order: z.string().optional(),
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
