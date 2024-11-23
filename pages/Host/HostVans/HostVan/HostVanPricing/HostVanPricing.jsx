import "./HostVanPricing.css"
import { useOutletContext } from "react-router-dom"

export default function HostVanPricing(){
  const [ van ] = useOutletContext()
  return (
    <p className="host-van-pricing">
      <span className="host-van-pricing__price">${van.price.toFixed(2)}</span>
      /day
    </p>
  )
}