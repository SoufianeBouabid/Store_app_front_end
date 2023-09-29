import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();

  //username instead of accessToken
  return user ? (
    <Outlet /> //Any child component of require auth
  ) : (
    //If the replace prop is not used, and the user successfully logs in and then
    //presses the browser's back button, they might be taken back to the protected route
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
