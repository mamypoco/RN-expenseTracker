import { useReducer, createContext } from "react";

const DUMMY_EXPENSES = [
   {
      id: "e1",
      description: "A pair of shoes",
      amount: 59.99,
      date: new Date("2023-01-13"),
   },
   {
      id: "e2",
      description: "A pair of pants",
      amount: 89.99,
      date: new Date("2021-12-12"),
   },
   {
      id: "e3",
      description: "Some banana",
      amount: 5.99,
      date: new Date("2023-01-12"),
   },
   {
      id: "e4",
      description: "A book",
      amount: 14.99,
      date: new Date("2023-01-15"),
   },
   {
      id: "e5",
      description: "Another book",
      amount: 18.59,
      date: new Date("2023-01-10"),
   },
   {
      id: "e6",
      description: "A pair of pants",
      amount: 89.99,
      date: new Date("2021-12-12"),
   },
   {
      id: "e7",
      description: "Some banana",
      amount: 5.99,
      date: new Date("2023-01-06"),
   },
   {
      id: "e8",
      description: "A book",
      amount: 14.99,
      date: new Date("2023-01-08"),
   },
   {
      id: "e9",
      description: "Another book",
      amount: 18.59,
      date: new Date("2023-01-10"),
   },
];

export const ExpensesContext = createContext({
   expenses: [],
   addExpense: ({ description, amount, date }) => {},
   deleteExpense: (id) => {},
   updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
   switch (action.type) {
      case "ADD":
         const id = new Date().toString() + Math.random().toString();
         return [{ ...action.payload, id: id }, ...state];
      case "UPDATE":
         const updatableExpenseIndex = state.findIndex(
            (expense) => expense.id === action.payload.id
         );

         const updatableExpense = state[updatableExpenseIndex];
         const updatedItem = { ...updatableExpense, ...action.payload.data };
         const updatedExpenses = [...state];
         updatedExpenses[updatableExpenseIndex] = updatedItem;
         //overwrite this with updatedItem
         return updatedExpenses;

      case "DELETE":
         return state.filter((expense) => expense.id !== action.payload);
      //return true (not equal to action.payload) for all the item. Return false(equal) for deleting it.
      default:
         return state;
   }
}

function ExpensesContextProvider({ children }) {
   const [expensesState, dispatch] = useReducer(
      expensesReducer,
      DUMMY_EXPENSES
   );

   function addExpense(expenseData) {
      dispatch({ type: "ADD", payload: expenseData });
   }

   function deleteExpense(id) {
      dispatch({ type: "DELETE", payload: id });
   }

   function updateExpense(id, expenseData) {
      dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
   }

   const value = {
      expenses: expensesState,
      //points expenseState under const [expensesState, dispatch ]
      addExpense: addExpense,
      //points function addExpense
      deleteExpense: deleteExpense,
      //points function deleteExpense
      updateExpense: updateExpense,
      //points function updateExpense
   };

   return (
      <ExpensesContext.Provider value={value}>
         {children}
      </ExpensesContext.Provider>
   );
}

export default ExpensesContextProvider;
