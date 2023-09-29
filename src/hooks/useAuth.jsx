import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
//import jwt_decode from "jwt-decode";

export const useAuth = () => {
  const {
    user,
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    setUser,
  } = useContext(AuthContext);

  // Add a function to set both tokens and save them in local storage
  const setAccess = (accessToken) => {
    // Update the auth context
    setAccessToken({ accessToken });
    // setUser(userData);
    //setUser(jwt_decode(data.access));

    // Save both tokens and user data in local storage
    localStorage.setItem("accessToken", accessToken);

    // localStorage.setItem("userData", JSON.stringify(userData));
  };

  const setRefresh = (refreshToken) => {
    // Update the auth context

    setRefreshToken({ refreshToken });
    localStorage.setItem("refreshToken", refreshToken);
    // localStorage.setItem("userData", JSON.stringify(userData));
  };
  const setUs = (user) => {
    setUser({ user });
    localStorage.setItem("username", user);
  };

  return { user, accessToken, refreshToken, setAccess, setRefresh, setUs };
};
