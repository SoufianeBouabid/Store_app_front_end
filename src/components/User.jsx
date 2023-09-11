import { Link } from "react-router-dom";

const Tag = () => {
  return (
    <section>
      <h1>Users Page</h1>
      <br />
      <p>List of users below</p>
      
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Tag;
