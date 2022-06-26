import { useNavigate, Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserAuth } from "./authSlice";
import jwt_decode from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
  const navigate = useNavigate();
  const userAuth = useSelector(getUserAuth);
  const location = useLocation();
  const decoded = userAuth?.accessToken
    ? jwt_decode(userAuth.accessToken)
    : undefined;

  const roles = decoded?.UserInfo?.roles || [];
  const USER_ID = decoded?.UserInfo?.USER_ID || null;

  return roles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : USER_ID ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace /> //navigate("/unauthorized") //userId가 있는데 역할이 없으면
  ) : (
    navigate("/login")
    // <Navigate to="/login" state={{ from: location }} replace />
    //userId도 없으면 로그인 해라
  );
};

export default RequireAuth;
