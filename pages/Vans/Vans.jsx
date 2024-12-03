import React, { Suspense } from "react"
import { Van } from "/components"
import { Link, useSearchParams, useLoaderData, defer, Await } from "react-router-dom"
import { getVans } from "/api"
import "./Vans.css"

export function loader(){
  return defer({ vans: getVans() })
}

export default function Vans(){

  const [ searchParams, setSearchParams ] = useSearchParams()
  const typeFilter = searchParams.get("type")
  const vansPromise = useLoaderData()

  function changeVansType(value){
    setSearchParams(prevSearchParams => {
      const sp = new URLSearchParams(prevSearchParams)
      if (value || value === 0)
        sp.set("type", value)
      else
        sp.delete("type")
      return sp
    })
  }

  function getButtonClassName(type){
    if (type.toLowerCase() === typeFilter)
      return `vans__navigation-button vans__navigation-button--${type.toLowerCase()} vans__navigation-button--selected`
    else 
     return `vans__navigation-button vans__navigation-button--${type.toLowerCase()}`
  }

  function renderVansContent( vans ){

    console.log( vans )

    const filteredVans = ( typeFilter ) 
    ? vans.filter(van => van.type.toLowerCase() === typeFilter)
    : vans

    const vansListContent = filteredVans.map(van =>
      <Link to={`${van.id}`} state={{search: searchParams.toString(), type: typeFilter}} key={`van-${van.id}`}>
        <li>
          <Van
            imgSrc={van.imageUrl}
            name={van.name}
            price={`$${van.price}`}
            type={van.type}
          />
        </li>
      </Link>)

      return (
        <>
          <nav className="vans__navigation">
            <button onClick={ _ => changeVansType("simple")} className={getButtonClassName("simple")}>Simple</button>
            <button onClick={ _ => changeVansType("luxury")} className={getButtonClassName("luxury")}>Luxury</button>
            <button onClick={ _ => changeVansType("rugged")} className={getButtonClassName("rugged")}>Rugged</button>
            { typeFilter && <button onClick={ _ => changeVansType("")} className="vans__clear-button">Clear filters</button> }
          </nav>
          <ul className="vans__list">
            { vansListContent }
          </ul>
        </>
      )
  }

  return (
    <main className="vans">
      <h1 className="vans__main-title">Explore our van options</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={ vansPromise.vans }>
          { renderVansContent }
        </Await>
      </Suspense>
    </main>
  )
}