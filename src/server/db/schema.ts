// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
  boolean,
  text,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `word-count-down_${name}`);

export const writingProjects = createTable(
  "writing_project",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    title: varchar("title", { length: 256 }).notNull(),
    goalCount: integer("goal_count").notNull(),
    currentCount: integer("current_count").notNull(),
    createdOn: timestamp("created_on")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    edited: timestamp("edited")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    url: text("url"),
    archived: boolean("archived").notNull(),
    userId: varchar("user_id", { length: 36 }).notNull(),
  },
  (project) => ({
    userIdIndex: index("user_id_idx").on(project.userId),
  }),
);

export const entries = createTable(
  "entry",
  {
    id: serial("id").primaryKey(),
    newCount: integer("new_count").notNull(),
    diff: integer("diff").notNull(),
    date: timestamp("date")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    projectId: varchar("project_id", { length: 36 }).notNull(),
  },
  (entry) => ({
    projectIdIndex: index("project_id_idx").on(entry.projectId),
  }),
);
