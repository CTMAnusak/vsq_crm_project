"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, User, LineProfile } from "@/types";
import { liffService } from "@/lib/liff";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAcceptTerms, setIsAcceptTerms] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const isRegisterPage = pathname === "/register" || pathname.startsWith("/register/");

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        // Initialize LIFF
        await liffService.init();

        if (liffService.isLoggedIn()) {
          const profile = await liffService.getProfile();
          const email = await liffService.getEmail();
          const idToken = await liffService.getIdToken();
          const accessToken = await liffService.getAccessToken();

          console.log("accessToken: ", accessToken);

          try {
            const res = await fetch("/api/auth", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ profile, idToken, accessToken }),
            });
            const result = await res.json();

            const profileImageUrl = profile.pictureUrl ?? null;

            if (result.isRegistered) {
              const profileCustomer = { ...result.user, profileImage: profileImageUrl ?? null } as User;
              setUser(profileCustomer);
              setIsAuthenticated(result.authenticated);
            } else {
              const profileLine = { lineUserId: profile.userId, email: email ?? null, profileImage: profileImageUrl ?? null } as User;
              setUser(profileLine);
              setIsAuthenticated(result.authenticated);
            }
          } catch (error) {
            const profileLine = { lineUserId: profile.userId, email: email ?? null, profileImage: profile.pictureUrl ?? null } as User;
            setUser(profileLine);
            setIsAuthenticated(false);
          }

          setIsAcceptTerms(true);
        } else {
          if (!isRegisterPage) {
            await liffService.login();
          }
        }
      } catch (error: any) {
        setUser(null);
        console.error("Auth initialization failed:", error?.message || error);
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, [isRegisterPage]);

  const login = async () => {
    try {
      await liffService.login();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    setUser(null);
    liffService.logout();
  };

  const closeWindow = () => {
    liffService.closeWindow();
  };

  const getIdToken = async () => {
    return await liffService.getIdToken();
  };

  const getAccessToken = async () => {
    return await liffService.getAccessToken();
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isAcceptTerms,
    isLoading,
    login,
    logout,
    closeWindow,
    getIdToken,
    getAccessToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
