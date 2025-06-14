/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AppContextType {
  adminData: any; // Replace 'any' with your specific type
  setAdminData: (data: any) => void;
}

export const AppContext = createContext<AppContextType>({
  adminData: null,
  setAdminData: () => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [adminData, setAdminData] = useState();

// Initialize from cookies on mount
  useEffect(() => {
    const loadAdminData = () => {
      const adminCookie = Cookies.get("adminData");
      if (adminCookie) {
        try {
          const parsedData = JSON.parse(adminCookie);
          setAdminData(parsedData);
        } catch (error) {
          console.error("Error parsing admin data", error);
        }
      }
    };
    loadAdminData();
  }, []);
  

  return (
    <AppContext.Provider value={{ adminData, setAdminData }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
}
