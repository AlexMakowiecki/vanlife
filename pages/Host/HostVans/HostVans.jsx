import React, { Suspense } from "react"
import { VanSmall } from "/components"
import { Link, useLoaderData, redirect, defer, Await } from "react-router-dom"
import { getHostVans } from "/api"
import "./HostVans.css"

export function loader({ params, request }) {
  /* params not needed, only here for remembering */
  if (!localStorage.getItem("loggedIn")) {
    const loginMessage = "You must log in first"
    const prevPath = new URL(request.url).pathname
    return redirect(`/login?message=${loginMessage}&prevPath=${prevPath}`)
  }
  return defer({ hostVans: getHostVans() })
}

export default function HostVans() {
  const loaderPromise = useLoaderData()
  function renderVansList(vans) {
    const vansListContent = vans.map((van) => {
      return (
        <Link to={`${van.id}`} id={van.id} key={`host-van-${van.id}`}>
          <VanSmall imgSrc={van.imageUrl} name={van.name} price={van.price}>
            <p className="van-small__edit-text">View</p>
          </VanSmall>
        </Link>
      )
    })
    return (
      <ul className="host-vans__list">
        {vans && vansListContent}
      </ul>
    )
  }

  return (
    <div className="host-vans">
      <h1 className="host-vans__main-title">Your listed vans</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={loaderPromise.hostVans}>
          {(vans) => renderVansList(vans)}
        </Await>
      </Suspense>
    </div>
  )
}