import { BarGraph} from "/components"
import kNotation from "/libraries/kNotation"
import "./Income.css"

export default function Income(){

  const transactionListContent = Array.from( {length: 4}, () => {
    return (
      <li className="income__transaction-box">
        <p className="income__transaction-number">$720</p>
        <p className="income__transaction-date">1/12/22</p>
      </li>
    )
  })

  return (
    <div className="income no-inside-margin">
      <div className="income__summary">
        <div className="income__header">
          <h1 className="income__main-title">Income</h1>
          <p className="income__subtitle">Last <span className="remarked">30 days</span></p>
        </div>
        <p className="income__number">$2,880</p>
      </div>

      <BarGraph
        className= "income__graph"
        graphData= { incomesInfo }
        options= {{
          xKey: "month",
          yKey: "income",
          maxY: 5000,
          yLine: Array.from({length: 6}, (_, i) => `$${kNotation(i*1000)}`)
        }}
      />

      <div className="income__transactions">
        <div className="income__transactions-header flex-container--spaced">
          <h2 className="income__secondary-title">Your transactions (4)</h2>
          <p className="income__subtitle">Last <span className="remarked">30 days</span></p>
        </div>
        <ul className="income__transactions-list">
          { transactionListContent }
        </ul>
      </div>
    </div>
)
}


const incomesInfo = [
  { income: 3200, month: "Ju" },
  { income: 4500, month: "Au" },
  { income: 2100, month: "Se" },
  { income: 3900, month: "Oc" },
  { income: 4900, month: "No" },
  { income: 2880, month: "De" }
];