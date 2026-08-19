import { useMemo } from "react"
import { useBudget } from "../Hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {
  const {state} =useBudget()

  
  const filteretExpenses = state.currentCategory? state.expenses.filter(expenses=>expenses.category===state.currentCategory) : state.expenses

  const isEmpty= useMemo(()=>filteretExpenses.length===0,[state.expenses])

  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
      {isEmpty?<p className="text-gray-600 text-2xl font-bold">there no expenses</p>:(

        <>
          <p className="text-gray-600 text-2xl font-bold my-5"> Expenses List</p>
          {filteretExpenses.map(expense=>(

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
