import User from "../models/user_model";

export const getCurrentUser = (): User | null => {
  const storedUser = localStorage.getItem("currentUser");

  if (!storedUser) return null;

  return JSON.parse(storedUser);
};