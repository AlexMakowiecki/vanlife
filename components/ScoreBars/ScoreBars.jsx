import { IoStar } from "react-icons/io5";
import { ProgressBar, ScoreText } from "/components"
import classNames from "classnames"
import "./ScoreBars.css"

export default function ScoreBars({scoreArray, className}){
  const scoreRatios = scoreArray.reduce((total, score) => {
    const newTotal = [...total]
    newTotal[score-1]++
    return newTotal
  }, [0,0,0,0,0])
  console.log(scoreRatios)
  const scoreBarsClass = classNames("score-bars", "no-inside-margin", className)
  const scoreRatiosMainContent = scoreRatios.map((scoreRatio, i) => {
    return (
      <div className="score-bars__score">
        <p className="score-bars__score-left">{ i+1 } stars</p>
        <ProgressBar ratio={scoreRatio/scoreArray.length} className="score-bars__percentage-bar"/>
        <p className="score-bars__score-right">{ scoreRatio/scoreArray.length * 100 }%</p>
      </div>
    )
  })

  const totalNumber = scoreArray.reduce((total, score, i) => {
    return total + score
  }, 0)/scoreArray.length.toFixed(2)

  return (
    <div className={scoreBarsClass}>
      <div className="score-bars__header">
        <ScoreText 
          score={ totalNumber } 
          iconClassName="score-bars__star-icon" 
          className="score-bars__total-score"
        />
        <p className="score-bars__overall-text">Overall rating</p>
      </div>
      <div className="score-bars__main">
        { scoreRatiosMainContent } 
      </div>
    </div>
  )
}