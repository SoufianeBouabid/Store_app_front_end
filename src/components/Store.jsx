import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import { useContext } from "react";
// import AuthContext from "../context/AuthProvider";
import customFetcher from "../hooks/fetchInstance";

const Store = () => {

  let [stores, setStores] = useState([]);
  // let { authTokens } = useContext(AuthContext);

  useEffect(() => {
    getStores();
  }, []);

  let getStores = async () => {
    let { response, data } = await customFetcher("/http://localhost:5000/store/");

    if (response.status === 200) {
      setStores(data);
    }
  };

  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <p>List of stores below</p>
      <br />
      <ul>
        {stores.map((store) => (
          <li key={store.id}>{store.body}</li>
        ))}
      </ul>
      <p>Add new stores here :</p>
      <div className="flexGrow">
        <Link to="/home">Home</Link>
      </div>
    </section>
  );
};

export default Store;
