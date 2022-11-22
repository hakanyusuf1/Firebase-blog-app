import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRouter from "./PrivateRouter";
import Profile from "../pages/Profile";
import NewBlog from "../pages/NewBlog";
import Details from "../pages/Details";
import UpdateBlog from "../pages/UpdateBlog";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="profile" element={<PrivateRouter />}>
          <Route path="" element={<Profile />} />
        </Route>

        <Route path="details/:id" element={<PrivateRouter />}>
          <Route path="" element={<Details />} />
        </Route>
        <Route path="/update" element={<PrivateRouter />}>
          <Route path="" element={<UpdateBlog />} />
        </Route>

        <Route path="new" element={<PrivateRouter />}>
          <Route path="" element={<NewBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
