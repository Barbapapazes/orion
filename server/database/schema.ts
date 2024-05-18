import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  githubId: integer("github_id").notNull().unique(),
  username: text("user").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  roleType: text("role_type", { enum: ['admin', 'creator'] }).default('creator')
});

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
})

export const modules = sqliteTable("modules", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  repo: text("repo").notNull().unique(),
  type: text("type", { enum: ['official', 'community'] }).notNull(),
  icon: text("icon"),
})
