import React from "react"
import { VanSmall } from "/components"
import { Link } from "react-router-dom"
import { getHostVans } from "/api"
import "./HostVans.css"

export default function HostVans(){
  const [vans, setVans] = React.useState([])

  React.useEffect(() => {
    getHostVans().then(data => setVans(data))
  },[])

  const vansListContent = vans?.map((van) => {
    return (
      <Link to={`${van.id}`} id={van.id} key={`host-van-${van.id}`}>
        <VanSmall imgSrc={van.imageUrl} name={van.name} price={van.price}>
          <p className="van-small__edit-text">Edit</p>
        </VanSmall>
      </Link>
    )
  })

  return (
    <div className="host-vans">
      <h1 className="host-vans__main-title">Your listed vans</h1>
      <ul className="host-vans__list">
        { vans && vansListContent }
      </ul>
    </div>
  )
}