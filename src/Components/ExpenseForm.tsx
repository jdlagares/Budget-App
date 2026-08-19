import { useEffect, useState } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import "react-date-picker/dist/DatePicker.css"
import "react-calendar/dist/Calendar.css"
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../Hooks/useBudget";


export default function ExpenseForm() {
    const[expense,setExpense]=useState<DraftExpense>({
        amount:0,
        expenseName:"",
        category:"",
        date :new Date()
    })
    const [error,setError]=useState("")

    const {dispatch,state,remainingBudget} =useBudget()

    useEffect(()=>{
        if(state.editingId){
            const editingExpense =state.expenses.find(current=>current.id===state.editingId)
            if(editingExpense){
                setExpense(editingExpense)
            }
           
        }
    },[state.editingId])
    
    const HandleChange=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const {name,value}= e.target
        const isAmountField =["amount"].includes(name)
        setExpense({
            ...expense,
            [name] : isAmountField?+value:value
        })
    }

    const handleChangeDate = (value: Value)=>{
        setExpense({
            ...expense,
            date:value
        })
    }

    const handleSubmit=(e:React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(Object.values(expense).includes("")){
            setError("All fields are mandatory. ")
            return
        }

        if(expense.amount>remainingBudget){
            setError("expense budget exceeded ")
            return
        }

        if(state.editingId){
            dispatch({type:"update-expense",payload:{expense :{id:state.editingId,...expense}}})
        }else{
            dispatch({type:"add-expense",payload:{expense}})
        }
        

        setExpense({
            amount:0,
            expenseName:"",
            category:"",
            date :new Date()
        })
    }

  return (
    <form  className="space-y-5" onSubmit={handleSubmit}>
        <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
            {state.editingId? "Edit Expense": "New Expenses"}
        </legend>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">Spent Name: </label>
            <input 
            type="text" 
            id="expenseName" 
            placeholder="Add the spent name" 
            className="bg-slate-100 p-2" 
            name="expenseName" 
            value={expense.expenseName}
            onChange={HandleChange}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">Amount: </label>
            <input 
            type="number" 
            id="amount" 
            placeholder="Add the amount ex. 300" 
            className="bg-slate-100 p-2" 
            name="amount" 
            value={expense.amount}
            onChange={HandleChange}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-xl">Category: </label>
            <select  
            id="category" 
            className="bg-slate-100 p-2" 
            name="category" 
            value={expense.category}
            onChange={HandleChange}
            >
                <option value="">--Selection--</option>
                {categories.map(category=>(
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">Date: </label>
            <DatePicker
                className="bg-slate-100 p-2 border-0"
                value={expense.date}
                onChange={handleChangeDate}
            />
        </div>
        <input 
            type="submit" 
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            value={state.editingId? "Save Changes": "Register Expense"}  
        />
    </form>
  )
}
