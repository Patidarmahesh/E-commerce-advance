import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthUser = createContext();

const AuthContext = ({ children }) => {
  const [auth, setAuth] = useState({
    user: "null",
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);
  return (
    <AuthUser.Provider value={[auth, setAuth]}>{children}</AuthUser.Provider>
  );
};

export const useAuth = () => useContext(AuthUser);

export default AuthContext;
