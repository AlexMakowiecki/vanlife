import classNames from "classnames"
import "./ProgressBar.css"

export default function ProgressBar({ ratio, direction="row", className, ...rest }){
  const progressBarClass = classNames("progress-bar", `progress-bar--${direction}`,className)
  const dimension = (direction === "row") ? "width" : "height" 
  return (
      <div className={ progressBarClass }>
        <div className="progress-bar__fill" style={{ [dimension]: `${ratio*100}%`}}></div>
      </div>
  )
}