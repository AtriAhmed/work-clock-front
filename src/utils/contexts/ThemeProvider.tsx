import React, { useContext } from "react"

// Define an interface for your context
export interface ThemeContextType {
  theme: string; // Replace 'any' with the actual type of 'user'
  setTheme: (theme: string) => void; // Replace 'any' with the actual type of 'user'
}

const defaultState: ThemeContextType = {
  theme: "",
  setTheme: () => {},
}

const ThemeContext = React.createContext<ThemeContextType>(defaultState)

function ThemeProvider({ state, children }: { state: ThemeContextType; children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>
  )
}

export default ThemeProvider

export function useThemeContext() {
  return useContext(ThemeContext)
}