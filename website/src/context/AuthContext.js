import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchCurrentUser, loginMember } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("editorials_token"));
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(Boolean(token));

  useEffect(() => {
    let isMounted = true;

    async function hydrateUser() {
      if (!token) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        const data = await fetchCurrentUser(token);
        if (isMounted) {
          setUser(data.user || null);
        }
      } catch (error) {
        localStorage.removeItem("editorials_token");
        if (isMounted) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsCheckingAuth(false);
        }
      }
    }

    hydrateUser();

    return () => {
      isMounted = false;
    };
  }, [token]);

  async function login(credentials) {
    const data = await loginMember(credentials);
    const nextToken = data.token;

    localStorage.setItem("editorials_token", nextToken);
    setToken(nextToken);
    setUser(data.user || null);

    return data;
  }

  function logout() {
    localStorage.removeItem("editorials_token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user && token),
        isCheckingAuth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
