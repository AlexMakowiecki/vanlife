import kNotation from "/libraries/kNotation"
import classNames from "classnames"
import { ProgressBar } from "/components"
import "./BarGraph.css"

export default function BarGraph({graphData, options = {}, className}){

  const {
    yLine,
    xLine,
    cantLines = 6,
    xKey = "x",
    yKey = "y",
    maxY = graphData.reduce((max, data) => Math.max(max, data[yKey]), -Infinity),
  } = options

  const yLineContent = (yLine) 
    ? yLine.map((yValue,i) => {
        return <div className="bar-graph__y-value" key={`bar-graph__y-value-${i}`}><p>{ yValue }</p></div>
      })
    : Array.from({length: 6}, (data, i) => {
      return <div className="bar-graph__y-value" key={`bar-graph__y-value-${i}`}><p>{ (maxY / (graphData.length - 1)) * i}</p></div>
    })

  const xLineContent = (xLine)
    ? xLine.map((xValue,i) => {
        return <div className="bar-graph__x-value" key={`bar-graph__x-value-${i}`}><p>{ xValue }</p></div>
      })
    : graphData.map((data,i) => {
        return <div className="bar-graph__x-value" key={`bar-graph__x-value-${i}`}><p>{ data[xKey] }</p></div>
      })

  const backgroundContent = (yLine)
    ? yLine.map((_, i)=> {
      return <div className="bar-graph__line" key={`bar-graph__line-${i}`}></div>
    })
    : Array.from({length: cantLines}, (_, i) => {
      return <div className="bar-graph__line" key={`bar-graph__line-${i}`}></div>
    })

  const barsContent = graphData.map((data, i) => {
    const barClassName = (i < graphData.length-2) ? "bar-graph__bar bar-graph__bar--light" : "bar-graph__bar"
    const ratio = data[yKey] / maxY
    return (
      <div className="bar-graph__bar-container" key={`bar-graph__bar-container-${i}`}>
        <ProgressBar ratio={ratio} direction="column" className={barClassName}/>
      </div>
    )
  })

  const barGraphClassName = classNames("bar-graph", className)

  return (
    <div className={barGraphClassName}>
      <div className="bar-graph__y-line">
        { yLineContent }
      </div>
      <div className="bar-graph__graph">
        <div className="bar-graph__background">
        { backgroundContent }
        </div>
        <div className="bar-graph__bars">
          { barsContent }
        </div>
      </div>
      <div className="bar-graph__x-line">
        { xLineContent }
      </div>
    </div>
  )
}