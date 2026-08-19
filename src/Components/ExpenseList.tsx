import { useMemo } from "react"
import { useBudget } from "../Hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {
  const {state} =useBudget()

  const isEmpty= useMemo(()=>state.expenses.length===0,[state.expenses])
  return (
    <div className="mt-10">
      {isEmpty?<p className="text-gray-600 text-2xl font-bold">there no expenses</p>:(

        <>
          <p className="text-gray-600 text-2xl font-bold my-5"> Expenses List</p>
          {state.expenses.map(expense=>(

            <ExpenseDetail
              key={expense.id}
              expense={expense}
            />
          
          ))}
        </>

      )}
    </div>
  )
}
