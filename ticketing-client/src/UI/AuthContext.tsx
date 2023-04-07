// AuthContext.tsx
import React, { createContext, useState, useContext } from "react";

interface AuthContextValue {
  username: string;
  setUsername: (username: string) => void;
}

const AuthContext = createContext<AuthContextValue>({
  username: "",
  setUsername: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [username, setUsername] = useState("");

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};
