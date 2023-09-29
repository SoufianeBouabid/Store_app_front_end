import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import customFetcher from "../hooks/fetchInstance";

const User = () => {
  const [user, setUser] = useState();
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("before call");
  useEffect(() => {
    let isMounted = true;
    // const controller = new AbortController();

    let access_token = localStorage.getItem("accessToken");
    let refresh_token = localStorage.getItem("refreshToken");

    const getUsers = async () => {
      // try {
      //   // Check if the user is authenticated (has a token)
      //   if (!access_token) {
      //     navigate("/login", { state: { from: location }, replace: true });
      //     return;
      //   }
      console.log("call ONGOING");
      const response = await customFetcher("http://localhost:5000/user");
      const answer = response.data;
      console.log(answer);
      isMounted && setUser(answer);
    };
    //   } catch (err) {
    //     console.error(err);
    //     navigate("/login", { state: { from: location }, replace: true });
    //   }
    // };

    getUsers();

    return () => {
      isMounted = false;
      // controller.abort();
    };
  }, []);

  return (
    <section>
      <h1>Users Page</h1>
      <br />
      {/* <h2>{user}</h2> */}
      <article>
        <h2>Users List</h2>
        {user?.length ? (
          <ul>
            {user.map((singleUser, i) => (
              <li key={i}>{singleUser?.name}</li>
            ))}
          </ul>
        ) : (
          <p>No users to display</p>
        )}
      </article>

      <div className="flexGrow">
        <Link to="/home">Home</Link>
      </div>
    </section>
  );
};

export default User;
