import { ScoreStars } from "/components"
import "./ReviewComment.css"

export default function Review({score=3}){
  return (
    <div className="review-comment">
      <ScoreStars score={score} className="review-comment__score"/>
      <div className="review-comment__header">
        <p className="review-comment__name">Elliot</p>
        <p className="review-comment__date">December 1,2022</p>
      </div>
      <p className="review-comment__comment">The beach bum is such as awesome van! Such as comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!</p>
    </div>
  )
}