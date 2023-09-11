import { Link } from "react-router-dom"

const Item = () => {
    return (
        <section>
            <h1>Admins Page</h1>
            <br />
            <p>List of Items below : </p>
            <br />
            <p>Add new Item here :</p>
            <div className="flexGrow">
                <Link to="/home">Home</Link>
            </div>
        </section>
    )
}

export default Item