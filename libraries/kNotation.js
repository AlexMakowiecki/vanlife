export default function kNotation(value){
  return (value >= 1000) ? (value/1000).toFixed(0) + "k"
                        : value
}