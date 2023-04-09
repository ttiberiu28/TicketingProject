import React, { createContext, useState, useContext } from "react";

interface AuthContextValue {
  username: string;
  setUsername: (username: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  restoreAuthFromLocalStorage: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextValue>({
  username: "",
  setUsername: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  restoreAuthFromLocalStorage: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const restoreAuthFromLocalStorage = () => {
    const storedUsername = localStorage.getItem("username");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedUsername && storedIsLoggedIn) {
      setUsername(storedUsername);
      setIsLoggedIn(storedIsLoggedIn === "true");
    }
  };

  const logout = () => {
    setUsername("");
    setIsLoggedIn(false);
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        setUsername,
        isLoggedIn,
        setIsLoggedIn,
        restoreAuthFromLocalStorage,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

