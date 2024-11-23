import { NavLink, Link } from "react-router-dom"
import { FaRegUserCircle } from "react-icons/fa";
import "./Header.css"

export default function Header(){
  return (
    <header>
      <Link to="/" className="header__main-logo">#VANLIFE</Link>
      <nav>
        <NavLink to="host" className={({ isActive }) => isActive ? "link link--active" : "link"}>Host</NavLink>
        <NavLink to="about" className={({ isActive }) => isActive ? "link link--active" : "link"}>About</NavLink>
        <NavLink to="vans" className={({ isActive }) => isActive ? "link link--active" : "link"}>Vans</NavLink>
        <NavLink to="login" className={({ isActive }) => isActive ? "icon-link icon-link--active" : "icon-link"}><FaRegUserCircle /></NavLink>
      </nav>
    </header>
  )
}
