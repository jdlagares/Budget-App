import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../Hooks/useBudget";
import { useMemo } from "react";

export default function BudgetTracker() {

    const {state,totalExpenses,remainingBudget}= useBudget()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <img src="/grafico.jpg" alt="Grafica" />
            </div>
            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-while uppercase font-bold rounded-lg"
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
