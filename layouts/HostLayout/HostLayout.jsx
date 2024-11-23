import { Outlet, NavLink } from "react-router-dom" 
import "./HostLayout.css"

export default function HostLayout(){
  const navClass = "host__nav-link link"
  return (
    <>
      <nav className="host-layout__nav host__inline-padding no-inside-margin">
        <NavLink to="." end className={({ isActive }) => isActive ? navClass + " link--active" : navClass}>Dashboard</NavLink>
        <NavLink to="income" className={({ isActive }) => isActive ? navClass + " link--active" : navClass}>Income</NavLink>
        <NavLink to="vans" className={({ isActive }) => isActive ? navClass + " link--active" : navClass}>Vans</NavLink>
        <NavLink to="reviews" className={({ isActive }) => isActive ? navClass + " link--active" : navClass}>Reviews</NavLink>
      </nav>
      <Outlet/>
    </>
  )
}