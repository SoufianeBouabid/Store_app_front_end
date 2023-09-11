import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <section>
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <br />
            <h2>Private</h2>
            <Link to="/home">Home</Link>
            <Link to="/item">Items Page</Link>
            <Link to="/store">Stores Page</Link>
            <Link to="/tag">Tags Page</Link>
            <Link to="/user">Users Page</Link>
        </section>
    )
}

export default LinkPage