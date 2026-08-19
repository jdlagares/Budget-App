import { CircularProgressbar,buildStyles } from "react-circular-progressbar";

import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../Hooks/useBudget";

import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {

    const {state,totalExpenses,remainingBudget,dispatch}= useBudget()
    const percentage= +((totalExpenses/state.budget)*100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                        pathColor:"#3B82F6",
                        trailColor: "#F5F5F5",
                        textSize:8
                    })}
                    text={`${percentage}% Spent`}
                />
            </div>
            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-while uppercase font-bold rounded-lg"
                    onClick={()=>dispatch({type:"reset-app"})}
                >
                    Reset App
                </button>
                <AmountDisplay
                    label="Budget"
                    amount={state.budget}
                />
                 <AmountDisplay
                    label="Avaiable"
                    amount={remainingBudget}
                />
                 <AmountDisplay
                    label="spent"
                    amount={totalExpenses}
                />
            </div>
    </div>
  )
}
