// jshint esversion:10

import React, { createContext, useContext, useState } from "react";

export const useAuthContext = () => {
  return useContext(authContext);
};

export default function ContextProvider({ children }) {
  const auth = useProviderAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

const authContext = createContext();

const useProviderAuth = () => {
  const [user, setUser] = useState(null);

  const persistUser = JSON.parse(localStorage.getItem("user"));

  if (!user && persistUser) {
    setUser(persistUser);
  }

  const signin = (login, cb) => {
    setUser(login);
    cb();
  };

  const signout = (cb) => {
    setUser(null);
    cb();
  };

  return { user, signin, signout };
};
