import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../App";
const useAuth = () => {
  const { user } = useContext(UserContext);
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  
  return isAuth ? <Outlet /> : <Navigate to="/Login"  />
};

export const ProtecteDashboard = () => {
  const {user} = useContext(UserContext)
  // const user = localStorage.getItem('user')
  return (user.accountType === "ROLE_ADMIN" /*|| user.accountType === 'collaborator'*/) ? <Outlet /> : <Navigate to="/"  />
};

export const ProtecteDashboardColl = () =>{
  const {user} = useContext(UserContext)
  return ( user.accountType === 'ROLE_COLLABORATOR') ? <Outlet /> : <Navigate to="/"  />
}

export const ProtectLoginout = () => {
  const isAuth = useAuth();
  
  return !isAuth ? <Outlet /> : <Navigate to="/"  />
};

export default ProtectedRoutes;