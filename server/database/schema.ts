import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql, relations } from 'drizzle-orm'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  githubId: integer('github_id').notNull().unique(),
  email: text('email').notNull().unique(),
  login: text('login').notNull().unique(),
  name: text('name'),
  avatarUrl: text('avatar_url').notNull(),
  roleType: text('role_type', { enum: ['admin', 'creator'] }).default('creator'),
  createdAt: text('created_at').notNull().$defaultFn(() => sql`(current_timestamp)`),
  updatedAt: text('updated_at').notNull().$defaultFn(() => sql`(current_timestamp)`).$onUpdateFn(() => sql`(current_timestamp)`),
})

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  createdAt: text('created_at').notNull().$defaultFn(() => sql`(current_timestamp)`),
  updatedAt: text('updated_at').notNull().$defaultFn(() => sql`(current_timestamp)`).$onUpdateFn(() => sql`(current_timestamp)`),
})

export const modules = sqliteTable('modules', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  repo: text('repo').notNull().unique(),
  type: text('type', { enum: ['official', 'community'] }).notNull(),
  icon: text('icon'),
  createdAt: text('created_at').notNull().$defaultFn(() => sql`(current_timestamp)`),
  updatedAt: text('updated_at').notNull().$defaultFn(() => sql`(current_timestamp)`).$onUpdateFn(() => sql`(current_timestamp)`),
})

export const usersRelations = relations(users, ({ many }) => ({
  templates: many(templates),
}))

export const categoriesRelations = relations(categories, ({ many }) => ({
  templates: many(templates),
}))

export const templates = sqliteTable('templates', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  hash: text('hash').notNull().unique(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  /**
   * Submitted: when a user submits a new template
   * Refused: when a user's template is refused by an admin
   * Validated: when a user's template is validated by an admin and visible by everyone
   */
  status: text('status', { enum: ['submitted', 'refused', 'validated'] }).notNull().default('submitted'),
  paidStatus: text('paid_status', { enum: ['free', 'paid'] }).notNull().default('free'),
  liveUrl: text('live_url'),
  accessUrl: text('access_url').notNull(),
  description: text('description').notNull(),
  descriptionHTML: text('description_html').notNull(),
  userId: integer('user_id').notNull().references(() => users.id), // rename to creatorId
  categoryId: integer('category_id').notNull().references(() => categories.id),
})
