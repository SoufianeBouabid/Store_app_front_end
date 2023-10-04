import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MyTable from "./Table";

import customFetcher from "../hooks/fetchInstance";
import useSWR from "swr";

const User = () => {
  const navigate = useNavigate();
  console.log("before call");

  const { data, error } = useSWR("http://localhost:5000/user", customFetcher, {
    focusThrottleInterval: 30000,
  });
  console.log(data);
  if (error) {
    navigate("/login");
  }

  return (
    <section>
      <h1>Users Page</h1>
      <br />
      <article>
        <h2>Users List</h2>
        <MyTable data={data?.data || []} />
        {/* {data?.data.length ? (
          <ul>
            {data.data.map((singleUser, i) => (
              <li key={i}>{singleUser?.name}</li>
            ))}
          </ul>
        ) : (
          <p>No users to display</p>
        )} */}
      </article>

      <div className="flexGrow">
        <Link to="/home">Home</Link>
      </div>
    </section>
  );
};

export default User;
