import { createContext, FC, useState } from "react";

interface Context {
  token: string | null;
  isAuth: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
}

const initialContext: Context = {
  token: "",
  isAuth: false,
  authenticate: (token: string) => {},
  logout: () => {},
};

export const AuthContext = createContext<Context>(initialContext);

interface Props {
  children: React.ReactNode;
}

const AuthContextProvider: FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const authenticate = async (token: string) => {
    setToken(() => token);
    console.log(token);
  };

  const logout = () => {
    setToken(() => null);
  };

  const value: Context = {
    token,
    isAuth: !!token,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
