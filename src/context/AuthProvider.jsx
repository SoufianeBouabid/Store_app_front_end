import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {/* //the children are the component that will nested inside the auth provider */}
      {/*eslint-disable-next-line*/}
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
