import "./HostVanLayout.css"
import React from "react"
import { VanType } from "/components"
import { HiArrowLeft } from "react-icons/hi2";
import { useParams, Link, NavLink, Outlet } from "react-router-dom"
import { getVan } from "/api"

export default function HostVanLayout(){
  const { id } = useParams()
  const [ van, setVan ] = React.useState(null)

  React.useEffect(() => {
    getVan(id).then(data => setVan(data))
  },[])

  return (
    <div className="host-van">
      <Link to="../" relative="path" className="host-van__return">
        <HiArrowLeft className="host-van__return-icon"/>
        <p className="host-van__return-text">Back to all vans</p>
      </Link>

      <div className="host-van__info">
        <div className="host-van__main-info">
          <img src={van?.imageUrl} className="host-van__img"></img>
          <div className="host-van__info-text">
            <VanType type={van?.type} className="host-van__type"/>
            <p className="host-van__name">{van?.name}</p>
            <p className="host-van__price">${van?.price}<span className="van-details__price-time">/day</span></p>
          </div>
        </div>
        <nav className="host-van__nav">
          <NavLink to="." end className={({ isActive }) => isActive ? "host-van__nav-link link link--active" : "host-van__nav-link link"}>Details</NavLink>
          <NavLink to="pricing" className={({ isActive }) => isActive ? "host-van__nav-link link link--active" : "host-van__nav-link link"}>Pricing</NavLink>
          <NavLink to="photos" className={({ isActive }) => isActive ? "host-van__nav-link link link--active" : "host-van__nav-link link"}>Photos</NavLink>
        </nav>
        { van && <Outlet context={[ van ]}/>}
      </div>
    </div>
  )
}