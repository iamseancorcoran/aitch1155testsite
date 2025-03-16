
import { useState, useEffect } from "react";
import { UserData, getUserData, saveUserData } from "./supabase";

export const useAuth = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userData = getUserData();
    if (userData) {
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = async (name: string, email: string): Promise<boolean> => {
    try {
      // Save user data to Supabase (or localStorage in our mock implementation)
      const success = await saveUserData({ name, email });
      if (success) {
        setUser({ name, email });
      }
      return success;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
    isLoggedIn: !!user,
  };
};
