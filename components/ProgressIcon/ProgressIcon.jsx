import classNames from "classnames"
import"./ProgressIcon.css"

export default function ProgressIcon({ icon, ratio, className }){
  return (
    <div className="progress-icon">
      <div className="progress-icon__background">
        {icon}
      </div>
      <div className="progress-icon__fill" style={{width: `${ratio*100}%`}}>
        {icon}
      </div>
    </div>
  )
}