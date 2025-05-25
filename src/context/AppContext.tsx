'use client'

import { useState, createContext, useContext } from "react";

interface AppContextType {
  appName: string;
  setAppName: (name: string) => void;
  clientUser: string;
}
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "KERTAS-KERJA";
const CLIENT_USER = process.env.NEXT_PUBLIC_CLIENT_USER || "--"; // menunjuk ke nama lembaga client (klien) asli
const AppContext = createContext<AppContextType | undefined>(undefined);

// for global static text for branding purposes
export function AppProvider({ children }: Readonly<{ children: React.ReactNode; }>) {
  const [appName, setAppName] = useState(APP_NAME);
  return (
    <AppContext.Provider value={{ appName, setAppName, clientUser: CLIENT_USER }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
}
