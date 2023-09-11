import { Link } from "react-router-dom"

const Store = () => {
    return (
        <section>
            <h1>Admins Page</h1>
            <br />
            <p>List of stores below</p>
            <br />
            <p>Add new stores here :</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Store