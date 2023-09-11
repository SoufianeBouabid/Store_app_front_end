import Home from "./components/Home";
import Item from "./components/Item";
import Layout from "./components/Layout";
import LinkPage from "./components/LinkPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import Store from "./components/Store";
import Tag from "./components/Tag";
import Unauthorized from "./components/Unauthorized";
import User from "./components/User";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="item" element={<Item />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="store" element={<Store />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="tag" element={<Tag />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="user" element={<User />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
