import React from "react"
import { VanType } from "/components"
import { useParams, Link, useLocation } from "react-router-dom"
import { HiArrowLeft } from "react-icons/hi2";
import { getVan } from "/api"
import "./VanDetails.css"

export default function VanDetails({imgSrc, type, name, price, description}){
  const [ van, setVan ] = React.useState(null)
  const { id } = useParams()
  const { state, pathname } = useLocation()

  React.useEffect(() => {
    getVan( id ).then(data => setVan(data))
  }, [])

  return (
    <main className="van-details">
      { van && 
      <>
        <Link to={`..${(state) ? `?${state.search}` : ""}`} relative="path" className="van-details__return">
          <HiArrowLeft className="van-details__return-icon"/>
          <p className="van-details__return-text">Back to {(state?.type) ? state.type : "all"} vans</p>
        </Link>
        <div className="van-details__info">
          <img src={van?.imageUrl} className="van-details__img"></img>
          <div className="van-details__info-text">
            <VanType type={van?.type} className="van-details__type"/>
            <h1 className="van-details__main-title">{van?.name}</h1>
            <p className="van-details__price">{van?.price}<span className="van-details__price-time">/day</span></p>
            <p className="van-details__description">{van?.description}</p>
            <button className="van-details__button">Rent this van</button>
          </div>
        </div>
      </>}
    </main>
  )
}