import { createContext, useState, useEffect } from "react";
// import jwt_decode from "jwt-decode";
//import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [accessToken, setAccessToken] = useState(() => {
    const accessTokenItem = localStorage.getItem("accessToken");
    return accessTokenItem ? accessTokenItem : null;
  });
  //is authenticate global component

  let [refreshToken, setRefreshToken] = useState(() => {
    const refreshTokenItem = localStorage.getItem("refreshToken");
    return refreshTokenItem ? refreshTokenItem : null;
  });

  let [user, setUser] = useState(() => {
    const usernameItem = localStorage.getItem("username");
    return usernameItem ? usernameItem : null;
  });
  //   [user, setUser] = useState(() =>
  //   localStorage.getItem("refreshToken")
  //     ? jwt_decode(localStorage.getItem("accessToken"))
  //     : null
  // );
  let [loading, setLoading] = useState(true);

  //const history = useNavigate();

  // let loginUser = async (e )=> {
  //     e.preventDefault()
  //     let response = await fetch('http://localhost:5000/login', {
  //         method:'POST',
  //         headers:{
  //             'Content-Type':'application/json'
  //         },
  //         body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
  //     })
  //     let data = await response.json()

  //     if(response.status === 200){
  //         setAuthTokens(data)
  //         setUser(jwt_decode(data.access))
  //         localStorage.setItem('authTokens', JSON.stringify(data))
  //         history.push('/')
  //     }else{
  //         alert('Something went wrong!')
  //     }
  // }

  // let logoutUser = () => {
  //   setAccessToken(null);
  //   setRefreshToken(null);
  //   setUser(null);
  //   //to divide
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("refreshToken");
  //   history.push("/login");
  // };

  // let updateToken = async ()=> {

  //     let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
  //         method:'POST',
  //         headers:{
  //             'Content-Type':'application/json'
  //         },
  //         body:JSON.stringify({'refresh':authTokens?.refresh})
  //     })

  //     let data = await response.json()

  //     if (response.status === 200){
  //         setAuthTokens(data)
  //         setUser(jwt_decode(data.access))
  //         localStorage.setItem('authTokens', JSON.stringify(data))
  //     }else{
  //         logoutUser()
  //     }

  //     if(loading){
  //         setLoading(false)
  //     }
  // }

  let contextData = {
    user: user,
    accessToken: accessToken,
    refreshToken: refreshToken,
    setAccessToken: setAccessToken,
    setRefreshToken: setRefreshToken,
    setUser: setUser,
  };

  //set state for user via api call get 
  useEffect(() => {
    if (accessToken) {
      // setUser(jwt_decode(accessToken.access));
      //console.log(jwt_decode(accessToken));
    }
    setLoading(false);
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
