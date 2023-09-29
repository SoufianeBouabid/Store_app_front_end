//import useSWR from 'swr';
import useAuth from "./useAuth";

//const fetcher = (...args) => fetch(...args).then(res => res.json())

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await fetch("/refresh", {
      method: "POST",
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
