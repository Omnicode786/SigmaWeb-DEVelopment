import { createContext, useState } from "react";

export const ThemeDataContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeDataContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeDataContext.Provider>
  );
}
