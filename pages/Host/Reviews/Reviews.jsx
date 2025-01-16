import { ScoreBars, ReviewComment } from "/components"
import "./Reviews.css"



export default function Reviews(){
  const scoreArray = [3,2,2,4]

  const scoreReviews = scoreArray.map(score => {
    return (
      <>
        <ReviewComment score={score}/>
        <hr className="reviews__separator"/>
      </>
    )
  })
  return (
    <section className="reviews no-inside-margin">
      <div className="reviews__header">
        <h1 className="reviews__main-title">Your reviews</h1>
        <p className="reviews__subtitle">last <span className="remarked">30 days</span></p>
      </div>
      <div className="reviews__main">
        <ScoreBars scoreArray={scoreArray} className="reviews__score-bars"/>
        <div className="reviews__comments">
          { scoreReviews }
        </div>
      </div>
    </section>
  )
}