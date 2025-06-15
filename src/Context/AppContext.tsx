/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AppContextType {
  cookieData: any; // Replace 'any' with your specific type
  setCookieData: (data: any) => void;
  open: boolean;
  setOpen: (data: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
  cookieData: null,
  setCookieData: () => {},
  open: false,
  setOpen: () => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [cookieData, setCookieData] = useState();
    const [open, setOpen] = useState<boolean>(false);

    console.log("login user data is here",cookieData)
  

// Initialize from cookies on mount
  useEffect(() => {
    const loadCookieData = () => {
      const adminCookie = Cookies.get("cookieData");
      if (adminCookie) {
        try {
          const parsedData = JSON.parse(adminCookie);
          setCookieData(parsedData);
        } catch (error) {
          console.error("Error parsing admin data", error);
        }
      }
    };
    loadCookieData();
  }, []);
  

  return (
    <AppContext.Provider value={{ cookieData, setCookieData,open,setOpen }}>
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
