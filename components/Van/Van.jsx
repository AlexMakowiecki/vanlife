import classNames from "classnames"
import { VanType } from "/components"
import "./Van.css"

export default function Van({ imgSrc, name, type, price, className, ...rest }){
  const vanClass = classNames( "van", className )
  return (
    <div className={ vanClass } {...rest}>
      <img src={ imgSrc } className="van__img"/>
      <h2 className="van__name">{ name }</h2>
      <VanType type={ type }/>
      <div className="van__price-container">
        <p className="van__price">{ price }</p>
        <p className="van__price-time">/day</p>
      </div>
    </div>
  )
}