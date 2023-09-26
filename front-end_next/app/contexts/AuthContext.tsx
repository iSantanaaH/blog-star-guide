import { createContext } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const isAuthenticated = false;

  return (
    <AuthContext.Provider value={{isAuthenticated}}>
        {children}
    </AuthContext.Provider>
  ) 
}
