import React from 'react';
import authService from '../../services/authentication';
import { useState } from 'react';


export const AuthContext = React.createContext(null)

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(() => {
        return authService.getUser();
      })
    
      const logout = () => {
        authService.logout()
        setUser(null)
      }
    
      const login = () => {
        authService.login()
        setUser(authService.getUser())
      }
    return (
        <AuthContext.Provider value={{
            login,
            logout,
            user,
            username: "JoeSoap",
            email: "test@test.com"
        }}>
            {children}
        </AuthContext.Provider>
    )
}