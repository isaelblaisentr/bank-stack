import {
  serial,
  text,
  timestamp,
  varchar,
  numeric,
  pgEnum,
  pgTableCreator,
  integer,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `bank-stack_${name}`);

// Define ENUM for account types
export const accountTypeEnum = pgEnum("account_type_enum", [
  "savings",
  "checking",
  "business",
  "joint",
  "student",
  "fixed_deposit",
  "recurring_deposit",
]);

export const user = createTable("user", {
  userId: serial("user_id").primaryKey(),
  name: varchar("name", 100).notNull(),
  email: varchar("email", 100).notNull().unique(),
  phoneNumber: varchar("phone_number", 15).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Banks table
export const bank = createTable("bank", {
  bankId: serial("bank_id").primaryKey(),
  bankName: varchar("bank_name", 100).notNull(),
  bankCode: varchar("bank_code", 20).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// BankAccounts table
export const bankAccount = createTable("bank_account", {
  accountId: serial("account_id").primaryKey(),
  userId: integer("user_id")
    .references(() => user.userId)
    .notNull(),
  bankId: integer("bank_id")
    .references(() => bank.bankId)
    .notNull(),
  accountNumber: varchar("account_number", 20).notNull().unique(),
  accountType: accountTypeEnum("account_type_enum").notNull(),
  balance: numeric("balance", 15, 2).default(0.0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Transactions table
export const transaction = createTable("transaction", {
  transactionId: serial("transaction_id").primaryKey(),
  fromAccountId: integer("from_account_id")
    .references(() => bankAccount.accountId)
    .notNull(),
  toAccountId: integer("to_account_id")
    .references(() => bankAccount.accountId)
    .notNull(),
  amount: numeric("amount", 15, 2).notNull(),
  transactionDate: timestamp("transaction_date").defaultNow(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
