
export type BudgetActions= 
    {type:"add-Budget",payload: {budget:number}}

export type BudgetState ={
    budget:number
}
export const initialState :BudgetState ={
    budget: 0
}

export const BudgetReducer= (
        state: BudgetState=initialState,
        action: BudgetActions
    )=>{
        if(action.type==="add-Budget"){
            return{
                ...state,
                Budget: action.payload.budget
            }
        }
        return state
}