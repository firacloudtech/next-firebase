'use client'


import { createContext, useContext, useState , ReactNode} from "react";

import { User} from 'firebase/auth'


interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuthContext = (): AuthContextProps => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return authContext;
};

export const AuthContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const authContextValue: AuthContextProps = {
    user,
    setUser,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};