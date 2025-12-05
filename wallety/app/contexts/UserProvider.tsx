import { useState, useEffect, type ReactNode } from "react";
import type { User } from "~/types/user";

import { useNavigate } from "react-router";
import { UserContext, type UserContextType } from "./UserContext";

const USER_STORAGE_KEY = "wallety_user";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();


  const saveUserToLocalStorage = (userData: User) => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    } catch (err) {
      console.error("Error saving user to localStorage:", err);
    }
  };

  const getUserFromLocalStorage = (): User | null => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        return JSON.parse(storedUser) as User;
      }
    } catch (err) {
      console.error("Error reading user from localStorage:", err);
    }
    return null;
  };

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const storedUser = getUserFromLocalStorage();
      if (storedUser) {
        setUser(storedUser);
        setIsLoading(false);
        return;
      }
      const response = await fetch("http://localhost:3001/users/1");

      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.statusText}`);
      }

      const userData = await response.json();
      setUser(userData);
      saveUserToLocalStorage(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch user");
      console.error("Error fetching user:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  const login = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("http://localhost:3001/users/1");

      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.statusText}`);
      }

      const userData = await response.json();
      setUser(userData);
      saveUserToLocalStorage(userData);
    } catch (err) {
      setError("Failed to login");
      console.error("Error logging in:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
      setError(null);
    } catch (err) {
      console.error("Error removing user from localStorage:", err);
    }
  };

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login");
    }
    setIsLoading(false);

  }, []);

  const value: UserContextType = {
    user,
    isLoading,
    error,
    refreshUser,
    logout,
    login,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
