"use client";

import { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import FormLoginUser from "../pages/login/page";
import Router from "next/router";
import axios from "axios";

type UserProps = {
  name: string;
  surname: string;
  email: string;
  phone: number;
  password: string;
  birthday: Date;
};

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserProps | null;
  signIn: (data: SignInData) => Promise<void>;
  testeProvider: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);

  function testeProvider() {
    alert("Funcionando!");
  };

  useEffect(() => {
    const { "blogstarguide.token": token } = parseCookies();

    if (token) {
      setIsAuthenticated(true);
      setUser((prevUser) => prevUser);
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    try {
      const response = await axios.post("http://localhost:3333/login", {
        email,
        password,
      });

      const token = response.data.token;

      setCookie(undefined, "blogstarguide.token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });

      setIsAuthenticated(true);

      Router.push("/");
    } catch (error) {
      console.error("Erro ao fazer login", error);
      setIsAuthenticated(false);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, testeProvider }}>
      {children}
    </AuthContext.Provider>
  );
}
