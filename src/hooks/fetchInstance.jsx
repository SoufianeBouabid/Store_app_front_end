// import jwt_decode from "jwt-decode";
// import dayjs from "daysjs";

let originalRequest = async (url, config) => {
  let response = await fetch(url, config);
  let data = await response.json();
  console.log("requesting: ", data);
  return { response, data };
};

const refreshToken = async () => {
  try {
    let refresh_token = localStorage.getItem("refreshToken")
      ? localStorage.getItem("refreshToken")
      : null;

    const response = await fetch("http://localhost:5000/refresh", {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${refresh_token}`,
        "Content-type": "application/json",
        //çà marche sans çà:
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({ refresh_token }),
    });

    return response; //here we must take the access token and sendit back
  } catch (err) {
    if (!err?.response) {
      console.log("Error refreshing tokens");
    }
  }
};

let customFetcher = async (url, config = {}) => {
  //   const user = jwt_decode(authTokens.access);
  //   const isExpired = dayjs.unix(user.exp);
  let access_token = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;
  console.log("access at start", { access_token });
  //Proceed with request
  config["headers"] = { Authorization: `Bearer ${access_token}` };

  console.log("Before request");
  let { response, data } = await originalRequest(url, config);

  console.log("after request");

  if (response.status === 401) {
    const response = await refreshToken();
    console.log("refresh sent");
    // config["headers"] = {
    //   Authorization: `Bearer ${refresh_token}`,
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers": "*",
    //   withCredentials: true,
    //   "Sec-Fetch-Mode": "cors",
    // };
    let data = await response.json();
    localStorage.setItem("accessToken", data.access_token);
    // console.log(data);

    // console.log(data);

    try {
      let new_access_token = localStorage.getItem("accessToken");
      // console.log(new_access_token);
      config["headers"] = { Authorization: `Bearer ${new_access_token}` };
      console.log("refresh ended, new call", { new_access_token });
      let newResponse = await originalRequest(url, config);

      console.log(newResponse);

      return newResponse;
    } catch (err) {
      console.log(err);
    }
  }
  return { response, data };
};

export default customFetcher;
