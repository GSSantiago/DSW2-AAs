export type EntryType = "income" | "expense";

export type ExpenseCategory =
  | "food"
  | "transport"
  | "housing"
  | "public_services"
  | "personal_care"
  | "transport"
  | "health"
  | "education"
  | "entertainment"
  | "other";

export type IncomeCategory =
  | "salary"
  | "freelance"
  | "gift"
  | "refund"
  | "other";

export type EntryCategory = ExpenseCategory | IncomeCategory;

export type Entry = {
  id: string;
  userId: string;
  title: string;
  description: string;
  value: number;
  date: string;
  type: EntryType;
  category: EntryCategory;
  createdAt: string;
  updatedAt: string;
};
