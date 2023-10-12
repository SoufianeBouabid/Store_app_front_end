import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

export const useAuth = () => {
  const {
    user,
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    setUser,
  } = useContext(AuthContext);

  const setAccess = (accessToken) => {
    setAccessToken({ accessToken });
    localStorage.setItem("accessToken", accessToken);
  };

  const setRefresh = (refreshToken) => {
    setRefreshToken({ refreshToken });
    localStorage.setItem("refreshToken", refreshToken);
  };
  const setUs = (user) => {
    setUser({ user });
    localStorage.setItem("username", user);
  };

  return { user, accessToken, refreshToken, setAccess, setRefresh, setUs };
};
