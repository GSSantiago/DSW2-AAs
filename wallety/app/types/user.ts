import type { Family } from "./family";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  currentFamilyId: string | null;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  family?: Family;
};
