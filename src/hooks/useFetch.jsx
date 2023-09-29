// import { useContext } from "react";
// import AuthContext from "../context/AuthProvider";
// import useAuth from "./useAuth";

// let baseURL = "http://localhost:5000";
// const { accessToken, refreshToken, setAccess, setRefresh } = useAuth();

// let originalRequest = async (url, config) => {
//   url = `${baseURL}${url}`;
//   let response = await fetch(url, config);
//   let data = await response.json();
//   console.log("REQUESTING:", data);
//   return { response, data };
// };

// let useFetch = () => {
//   let config = {};

//   let refreshToken = async (refresh_token) => {
//     let response = await fetch("http://localhost:5000/refresh/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       //corretc refresh
//       body: JSON.stringify({ refresh: refresh_token }),
//     });
//     let data = await response.json();

//     localStorage.setItem("refreshToken", JSON.stringify(data));
//     setStoredToken(data);
//     //setUser(jwt_decode(data.access));
//     return data;
//   };

//   let callFetch = async (url, config = {}) => {
//     let storedToken = localStorage.getItem("storedToken")
//       ? JSON.parse(localStorage.getItem("storedToken"))
//       : null;

//     //Proceed with request
//     config["headers"] = { Authorization: `Bearer ${storedToken?.access}` };

//     console.log("Before request");
//     let { response, data } = await originalRequest(url, config);
//     console.log("Before request");

//     if (response.status === "403") {
//       storedToken = await refreshToken(storedToken);
//       config["headers"] = { Authorization: `Bearer ${storedToken?.access}` };
//     }

//     return callFetch;
//   };
// };

// export default useFetch;
