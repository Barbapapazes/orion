import { drizzle } from 'drizzle-orm/d1'

import * as schema from '../database/schema'

export { sql, eq, and, or } from 'drizzle-orm'

export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}

export type Category = typeof schema.categories.$inferSelect
export type Module = typeof schema.modules.$inferSelect
export type User = typeof schema.users.$inferSelect
export type Template = typeof schema.templates.$inferSelect
