import "./Error.css"
import { useRouteError } from "react-router-dom"

export default function Error(){
  const routeError = useRouteError()
  return (
    <p>{routeError.message}</p>
  )
}