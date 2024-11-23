import React from "react"
import { Link } from "react-router-dom"
import { IoStar } from "react-icons/io5";
import { VanSmall, ScoreText } from "/components"
import "./Host.css"

export default function Host(){

  const [ vans, setVans ] = React.useState([])

  React.useEffect(() => {
    fetch(`/api/host/vans`)
      .then(res => res.json())
      .then(data => setVans(data.vans))
  },[])

  const vansListContent = vans?.map((van) => 
    <Link to={`vans/${van.id}`} key={`van-small-link-${van.id}`}>
      <li>
        <VanSmall imgSrc={van.imageUrl} name={van.name} price={van.price}>
          <p className="van-small__edit-text">Edit</p>
        </VanSmall>
      </li>
    </Link>
  )

  return (
    <main className="host">
      <section className="host__income host__inline-padding no-inside-margin">
        <h1 className="host__main-title">Welcome!</h1>
        <div className="flex-container--spaced">
          <p className="host__income-text">
            Income last <span className="host__income-days">30 days</span>
          </p>
          <Link className="host__simple-link">Details</Link> 
        </div>
        <p className="host__income-number">$2,260</p>
      </section>
      <section className="host__review host__inline-padding no-inside-margin">
        <h2 className="host__secondary-title">Review score</h2>
        <ScoreText score="5.0" total="5" className="host__score-text"/>
        <Link className="host__simple-link">Details</Link>
      </section>
      <section className="host__vans host__inline-padding no-inside-margin">
        <div className="flex-container--spaced">
          <h2 className="host__secondary-title">Your listed vans</h2>
          <Link className="host__simple-link">View all</Link>
        </div>        
        <ul className="host__vans-list">
          { vans && vansListContent }
        </ul>
      </section>
    </main>
  )
}