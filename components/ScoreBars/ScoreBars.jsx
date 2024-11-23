import { IoStar } from "react-icons/io5";
import { ProgressBar, ScoreText } from "/components"
import classNames from "classnames"
import "./ScoreBars.css"

export default function ScoreBars({scoreRatios, className}){
  const scoreBarsClass = classNames("score-bars", "no-inside-margin", className)
  const scoreRatiosMainContent = scoreRatios.map((scoreRatio, i) => {
    return (
      <div className="score-bars__score">
        <p className="score-bars__score-left">{ i+1 } stars</p>
        <ProgressBar ratio={scoreRatio} className="score-bars__percentage-bar"/>
        <p className="score-bars__score-right">{ scoreRatio * 100 }%</p>
      </div>
    )
  })

  const totalNumber = scoreRatios.reduce((total, scoreRatio, i) => {
    return total + scoreRatio * (i+1)
  }, 0).toFixed(2)

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