import React, { createContext, useContext, useState, ReactNode } from "react";

// Tipo para el contexto de usuario
type User = {
  id: number;
  full_name: string;
  email: string;
} | null;

// Tipo para los valores del contexto
interface UserContextType {
  user: User;
  login: (userData: User) => void;
  logout: () => void;
}

// Crea el contexto con valores por defecto
const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

// Hook personalizado para acceder al contexto
export const useUser = () => useContext(UserContext);

// Props del proveedor, incluye los children
interface UserProviderProps {
  children: ReactNode;
}

// Proveedor de contexto que envuelve la app
export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
