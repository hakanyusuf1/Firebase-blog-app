import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRouter = () => {
  const { currentUser } = useContext(AuthContext);
  // const currentUser = localStorage.getItem(JSON.stringify("user", null, 2));
  // console.log(currentUser);
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
