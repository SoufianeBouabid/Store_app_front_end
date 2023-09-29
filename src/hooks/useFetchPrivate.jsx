// import useRefreshToken from "./useRefreshToken";
// import useAuth from "./useAuth";
// import useSWR from "swr";
// import { mutate } from "swr";

// // const BASE_URL = "http://localhost:5000/";

// function useFetchPrivate() {
//   const refresh = useRefreshToken();
//   const { auth } = useAuth();

//   return async (url) => {
//     const response = await fetch(url, {
//       headers: {
//         Authorization: `Bearer ${auth?.accessToken || ""}`,
//         credentials: "include",
//       },
//     });
//     return await response.json();
//   };
// }

// // const { error } = useSWR(`http://localhost:5000/user/1`, fetcher);

// //   const requestInterceptor = async (url, options = {}) => {
// //     try {
// //       if (auth?.accessToken) {
// //         options.headers = {
// //           ...options.headers,
// //           Authorization: `Bearer ${auth.accessToken}`,
// //           credentials: "include",
// //         };
// //       } else if (error?.status === 403) {
// //         const newAccessToken = await refresh();
// //         if (newAccessToken) {
// //           options.headers["Authorization"] = `Bearer ${newAccessToken}`;

// //           // Trigger revalidation of the SWR data with updated headers
// //           mutate(url);
// //         }
// //         return fetch(url, options);
// //       }
// //     } catch (error) {
// //       return Promise.reject(error);
// //     }
// //   };

// //   return requestInterceptor;
// // }

// export default useFetchPrivate;


//  //const [users, setUsers] = useState();

//   // useEffect(() => {
//   //   let isMounted = true;
//   //   const controller = new AbortController();
//   //   const getUsers = async () => {
//   //     try {
//   //       const response = await fetch("http://localhost:5000/user/1", {
//   //         method: "GET",
//   //       });
//   //       const data = await response.json();
//   //       console.log(response.data);
//   //       isMounted && setUsers(data);
//   //       saveTokenInLocalStorage(response.data);
//   //     } catch (err) {
//   //       console.error(err);
//   //       navigate("/login", { state: { from: location }, replace: true });
//   //     }
//   //     // const response = await fetchPrivate("http://localhost:5000/user/1");
//   //     // console.log(response);
//   //   };
//   //   console.log("oifher");
//   //   getUsers();

//   //   return () => {
//   //     isMounted = false;
//   //     controller.abort();
//   //   };
//   // }, []);
