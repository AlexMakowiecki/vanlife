import "./HostVanDetails.css"
import { useOutletContext } from "react-router-dom"

export default function HostVanDetails(){
  const [ van ] = useOutletContext()
  return (
    <div className="host-van-details">
      <p><span className="bold">Name: </span>{van.name}</p>
      <p><span className="bold">Category: </span>{van.type[0].toUpperCase() + van.type.slice(1)}</p>
      <p><span className="bold">Description: </span>{van.description}</p>
      <p><span className="bold">Visibility: </span>Public</p>
    </div>
  )
}