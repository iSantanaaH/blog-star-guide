"use client"
import { createContext, useState } from "react";
import axios from "axios";

type AuthContextType = {
  isAuthenticated: boolean;
};

type SignInData = {
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function signIn({ email, password }: SignInData) {
    try {
      const response = await axios.post("http://localhost:3333/login", {
        email,
        password,
      });

      const TOKEN = response.data.TOKEN;

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro ao fazer login", error);
      setIsAuthenticated(false);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
