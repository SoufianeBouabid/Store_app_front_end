import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { setAccess, setRefresh, setUs } = useAuth(); // Use setAuthToken and auth from useAuth
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAccess(null);
    setRefresh(null);
    setUs(null);
    navigate("/login");
  };

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/user">Go to the user list</Link>
      <br />
      <Link to="/item">Go to the items list</Link>
      <br />
      <Link to="/tag">Go to tags list</Link>
      <br />
      <Link to="/store">Go to stores list</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
