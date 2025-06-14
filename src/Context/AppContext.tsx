/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AppContextType {
  adminData: any; // Replace 'any' with your specific type
  setAdminData: (data: any) => void;
  open: boolean;
  setOpen: (data: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
  adminData: null,
  setAdminData: () => {},
  open: false,
  setOpen: () => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [adminData, setAdminData] = useState();
    const [open, setOpen] = useState<boolean>(false);

    console.log("login user data is here",adminData)
  

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
    <AppContext.Provider value={{ adminData, setAdminData,open,setOpen }}>
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
