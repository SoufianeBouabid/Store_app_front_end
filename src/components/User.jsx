import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import MyTable from "./Table";
import * as yup from "yup";
import customFetcher from "../hooks/fetchInstance";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import styles from "../index.css";

const User = () => {
  const navigate = useNavigate();

  const { data, mutate } = useSWR("https://rest-apis-flask-python-project-0h1o.onrender.com/user", customFetcher);

  const schema = yup.object().shape({
    user: yup.string().min(1).required("Username is required"),
    pwd: yup.string().min(1).required("Please enter a valid password"),
  });

  if (data && data.data && data.data.error === "invalid_token") {
    navigate("/login");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { trigger: triggerSubmit } = useSWRMutation(
    "https://rest-apis-flask-python-project-0h1o.onrender.com/register",
    onFormSubmit
  );
  
  function onFormSubmit(url, { arg }) {
    fetch("https://rest-apis-flask-python-project-0h1o.onrender.com/register", {
      method: "POST",
      body: JSON.stringify({ username: arg.user, password: arg.pwd }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err.message);
      });
  }
  return (
    <section>
      <h1>Users Page</h1>
      <br />
      <article>
        <h2 className={styles.heading}>Add new User</h2>
        <form
          onSubmit={handleSubmit((data) => {
            triggerSubmit(data);
            setTimeout(() => {
              mutate();
            }, 500);
          })}
          className={styles.form}
        >
          <label htmlFor="Username">Username</label>
          <input
            {...register("user")}
            type="text"
            placeholder="Enter username"
            className={styles.input}
          />

          <p className="errorMessage">{errors.user?.message}</p>
          <label htmlFor="pwd">Password</label>
          <input
            {...register("pwd")}
            placeholder="Enter Password"
            type="password"
            className={styles.input}
          />
          <p className="errorMessage">{errors.password?.message}</p>
          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>
      </article>
      <article>
        <h2>Users List</h2>
        <MyTable mutate={mutate} data={data?.data || []} />
      </article>

      <div className="flexGrow">
        <Link to="/home">Home</Link>
      </div>
    </section>
  );
};

export default User;
