import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [accessToken, setAccessToken] = useState(() => {
    const accessTokenItem = localStorage.getItem("accessToken");
    return accessTokenItem ? accessTokenItem : null;
  });

  let [refreshToken, setRefreshToken] = useState(() => {
    const refreshTokenItem = localStorage.getItem("refreshToken");
    return refreshTokenItem ? refreshTokenItem : null;
  });

  let [user, setUser] = useState(() => {
    const usernameItem = localStorage.getItem("username");
    return usernameItem ? usernameItem : null;
  });

  let [loading, setLoading] = useState(true);
  let contextData = {
    user: user,
    accessToken: accessToken,
    refreshToken: refreshToken,
    setAccessToken: setAccessToken,
    setRefreshToken: setRefreshToken,
    setUser: setUser,
  };

  //add state to display username everywhere on the top of the page
  useEffect(() => {
    if (accessToken) {
      setLoading(false);
    }
  }, [accessToken, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

// Add prop validation for the 'children' prop
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
