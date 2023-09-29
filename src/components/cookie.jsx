// import { useEffect, useState } from "react";

// function Cookies() {
//   const [cookieValue, setCookieValue] = useState("");

//   useEffect(() => {
//     async function fetchCookieValue() {
//       try {
//         const response = await fetch("/api/read_cookie", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch cookie value");
//         }

//         const data = await response.json();
//         setCookieValue(data.cookieValue);
//       } catch (error) {
//         console.error("Error fetching cookie:", error);
//       }
//     }

//     fetchCookieValue();
//   }, []); // Empty dependency array ensures this effect runs once on component mount

//   return (
//     <div className="App">
//       <h1>Reading Cookies in React</h1>
//       <p>Value of 'my_cookie': {cookieValue}</p>
//     </div>
//   );
// }

// export default Cookies;
