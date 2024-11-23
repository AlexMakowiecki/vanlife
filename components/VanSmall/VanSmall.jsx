import classNames from "classnames"
import "./VanSmall.css"

export default function VanSmall({name, price, imgSrc, children, className, ...rest}){
  const vanSmallClass = classNames("van-small", className)
  return (
    <div className={ vanSmallClass } {...rest}>
      <img className="van-small__img" src={ imgSrc }/>
      <div className="van-small__info">
        <h3 className="van-small__title">{ name }</h3>
        <p className="van-small__price"><span>${ price }</span>/day</p>
      </div>
      { children }
    </div>
  )
}