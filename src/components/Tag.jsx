import { Link } from "react-router-dom";

const Tag = () => {
  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <p>List of tags below</p>
      <br />
      <p>Add new tags here :</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Tag;
