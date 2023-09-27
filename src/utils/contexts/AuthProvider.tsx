import React, { useContext } from "react"

// Define an interface for your context
export interface AuthContextType {
  user: any; // Replace 'any' with the actual type of 'user'
  setUser: (user: any) => void; // Replace 'any' with the actual type of 'user'
}

const defaultState: AuthContextType = {
  user: null,
  setUser: () => {},
}

const AuthContext = React.createContext<AuthContextType>(defaultState)

function AuthProvider({ state, children }: { state: AuthContextType; children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider

export function useAuthContext() {
  return useContext(AuthContext)
}