import { IoStar } from "react-icons/io5";
import classNames from "classnames"
import "./ScoreText.css"

export default function ScoreText({score, total, iconClassName, className, ...rest}){
  const scoreClass = classNames("score-text", className)
  const iconClass = classNames("score-text__icon", iconClassName)
  return (
    <div className={scoreClass} {...rest}>
      <IoStar className={ iconClass }/>
      <p className="score-text__score">
        { score }
        { total && <span className="score-text__total">/{ total }</span> } 
      </p>
    </div>
  )
}