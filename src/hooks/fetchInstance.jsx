let originalRequest = async (url, config) => {
  let response = await fetch(url, config);
  let data = await response.json();

  return { response, data };
};

const refreshToken = async () => {
  try {
    let refresh_token = localStorage.getItem("refreshToken")
      ? localStorage.getItem("refreshToken")
      : null;

    const response = await fetch("https://rest-apis-flask-python-project-0h1o.onrender.com/refresh", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
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
  let access_token = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;

  //Proceed with request
  config["headers"] = { Authorization: `Bearer ${access_token}` };
  let { response, data } = await originalRequest(url, config);


  if (response.status === 401) {
    const response = await refreshToken();

    let data = await response.json();
    localStorage.setItem("accessToken", data.access_token);

    try {
      let new_access_token = localStorage.getItem("accessToken");

      config["headers"] = { Authorization: `Bearer ${new_access_token}` };

      let newResponse = await originalRequest(url, config);
      return newResponse;
    } catch (err) {
      console.log(err);
    }
  }
  return { response, data };
};

export default customFetcher;
