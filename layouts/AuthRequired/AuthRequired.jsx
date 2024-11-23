import { Outlet, Navigate, useLocation } from "react-router-dom"

export default function AuthRequired(){
  const auth = localStorage.getItem("loggedIn");
  const location = useLocation()
  return (auth) 
    ? <Outlet/> 
    : <Navigate to="/login" state={{ message: "You must log in first.", prevPath: location.pathname}} replace/>
}