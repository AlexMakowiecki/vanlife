import "./VanType.css"

export default function VanType({ type="", ...rest}){
  const finalType = (type.toLowerCase() == "rugged") ? "Rugged"
                  : (type.toLowerCase() == "luxury") ? "Luxury"
                  : (type.toLowerCase() == "simple") ? "Simple"
                  : ""
  rest.className = (rest.className) ? rest.className : ""
  return (
    <div className={ `van__type ${finalType.toLowerCase()} ${rest?.className}` }>
      {finalType}
    </div>
  )
}