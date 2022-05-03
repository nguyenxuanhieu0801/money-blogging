import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase-app/firebase-config";

const AuthContext = createContext();
export const AuthProvider = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const value = { userInfo, setUserInfo };
 
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserInfo(user);
    });
  }, []);

  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (typeof context === undefined) throw new Error("useAuth must be with thin AuthProvider");
  return context;
};
