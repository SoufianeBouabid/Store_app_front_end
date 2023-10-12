import { useState } from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";

Modal.propTypes = {
  username: PropTypes.any.isRequired,
  setUsername: PropTypes.func.isRequired,
  pwd: PropTypes.any.isRequired,
  setPwd: PropTypes.func.isRequired,
  selectedId: PropTypes.number.isRequired,
  setSelectedId: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
};

export default function Modal({
  username,
  pwd,
  selectedId,
  isOpen,
  setIsOpen,
  mutate,
}) {
  let access_token = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;

  const [user, setUser] = useState(username);
  const [pass, setPass] = useState(pwd);

  const onSubmit = (id) => {
    if (mutate) {
      // console.log({ id, username, pwd });
      try {
        fetch(`http://localhost:5000/user/${id}`, {
          method: "POST",
          body: JSON.stringify({ username: user, password: pass }),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${access_token}`,
            withCredentials: true,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("User updated:", data);
            setTimeout(() => {
              mutate();
            }, 500);
          })
          .catch((err) => {
            console.log(err.message);
          });
        setIsOpen(false);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <ReactModal
      style={{
        content: {
          backgroundColor: "gray",
          //   backgroundColor: "dodgerblue",
        },
      }}
      isOpen={isOpen}
    >
      <input
        type="text"
        placeholder="Enter new username"
        value={user}
        onChange={(e) => {
          setUser(e.target.value);
        }}
        key={username}
      />

      <input
        type="password"
        placeholder="Enter new password"
        value={pass}
        onChange={(e) => {
          setPass(e.target.value);
        }}
        key={pwd}
      />

      <button onClick={() => onSubmit(selectedId)}>Update</button>

      <button onClick={() => setIsOpen(false)}>Close</button>
    </ReactModal>
  );
}
