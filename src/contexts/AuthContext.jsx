import React from 'react';

export const AuthContext = React.createContext();

export function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = React.useState(false);

  const toggleIsAuth = () => {
    setIsAuth(!isAuth);
  };
  return (
    <AuthContext.Provider value={{ isAuth, toggleIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
