import { useState } from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";

Modal.propTypes = {
  username: PropTypes.any,
  setUsername: PropTypes.func,
  pwd: PropTypes.any,
  setPwd: PropTypes.func,
  selectedId: PropTypes.number,
  setSelectedId: PropTypes.func,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  mutate: PropTypes.func,
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
      try {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/user/${id}`, {
          method: "POST",
          body: JSON.stringify({ username: user, password: pass }),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${access_token}`,
            withCredentials: true,
          },
        })
          .then((res) => res.json())
          .then(() => {
            setTimeout(() => {
              mutate();
            }, 500);
          });

        setIsOpen(false);
      } catch (err) {
        <p>{err.message}</p>;
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
