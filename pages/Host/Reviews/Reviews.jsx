import { ScoreBars, ReviewComment } from "/components"
import "./Reviews.css"

export default function Reviews(){
  const scoreRatios = [0.4,0.2,0.1,0.3,0.1]
  return (
    <section className="reviews no-inside-margin">
      <div className="reviews__header">
        <h1 className="reviews__main-title">Your reviews</h1>
        <p className="reviews__subtitle">last <span className="remarked">30 days</span></p>
      </div>
      <div className="reviews__main">
        <ScoreBars scoreRatios={scoreRatios} className="reviews__score-bars"/>
        <div className="reviews__comments">
          <ReviewComment/>
          <hr className="reviews__separator"/>
          <ReviewComment/>
          <hr className="reviews__separator"/>
          <ReviewComment/>
          <hr className="reviews__separator"/>
          <ReviewComment/>
          <hr className="reviews__separator"/>
        </div>
      </div>
    </section>
  )
}