import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoutes() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();


  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default ProtectedRoutes;
