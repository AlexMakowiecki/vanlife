import { useOutletContext } from "react-router-dom"
import "./HostVanPhotos.css"
export default function HostVanPhotos(){
  const [ van ] = useOutletContext()
  return (
    <ul className="host-van-photos">
      <li className="host-van-photos__photo-container">
        <img src={van.imageUrl}/>
      </li>
    </ul>
  )
}