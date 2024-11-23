import { ProgressIcon } from "/components"
import classNames from "classnames"
import { IoStar } from "react-icons/io5";
import "./ScoreStars.css"

export default function ScoreStars({ score, className }){ 
  const scoreStarsClass = classNames("score-stars", className)
  const scoreArray = Array.from({ length: 5 }, (_, i) => {
    const ratio = ((score - (i+1)) >= 0) ? 1 
                : ((score - (i+1)) > -1) ? Math.abs(score - (i+1)).toFixed(1)
                : 0
    return ratio
  })

  return (
    <div className={scoreStarsClass}>
      { scoreArray.map(scoreRatio => {
        return <ProgressIcon icon={<IoStar/>} ratio={scoreRatio}/>
      })}
    </div>
  )
}