import { useReducer,createContext, type ReactNode} from "react"
import {  type BudgetActions,  type BudgetState,BudgetReducer,initialState } from "../Reducers/budget-reducer"

type BudgetContextProps={
    state: BudgetState,
    dispatch: React.Dispatch<BudgetActions>
}
type BudgetProviderProps={
    children:ReactNode
}

export const BudgetContext=createContext<BudgetContextProps>(null!)

export const BudgetProvider =({children}:BudgetProviderProps)=>{  
    const [state,dispatch] =useReducer(BudgetReducer,initialState)

    return(
        <BudgetContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}