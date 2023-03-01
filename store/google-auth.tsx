import { createContext, FC, useState } from "react";

interface Context {
  token: string | null;
  email: string | null;
  isAuth: boolean;
  authenticate: (token: string) => void;
  emailSetter: (email: string) => void;
  logout: () => void;
}

const initialContext: Context = {
  token: "",
  email: "",
  isAuth: false,
  authenticate: (token: string) => {},
  emailSetter: (email: string) => {},
  logout: () => {},
};

export const AuthContext = createContext<Context>(initialContext);

interface Props {
  children: React.ReactNode;
}

const AuthContextProvider: FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const authenticate = (token: string) => {
    setToken(() => token);
  };

  const emailSetter = (email: string) => {
    setEmail(() => email);
  };

  const logout = () => {
    setToken(() => null);
  };

  const value: Context = {
    token,
    email,
    isAuth: !!token,
    authenticate,
    emailSetter,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
