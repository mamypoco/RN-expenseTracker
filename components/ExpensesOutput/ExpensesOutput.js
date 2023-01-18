import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const DUMMY_EXPENSES = [
   {
      id: "e1",
      description: "A pair of shoes",
      amount: 59.99,
      date: new Date("2023-1-12"),
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
      date: new Date("2023-1-06"),
   },
   {
      id: "e4",
      description: "A book",
      amount: 14.99,
      date: new Date("2023-1-08"),
   },
   {
      id: "e5",
      description: "Another book",
      amount: 18.59,
      date: new Date("2023-1-10"),
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
      date: new Date("2023-1-06"),
   },
   {
      id: "e8",
      description: "A book",
      amount: 14.99,
      date: new Date("2023-1-08"),
   },
   {
      id: "e9",
      description: "Another book",
      amount: 18.59,
      date: new Date("2023-1-10"),
   },
];

function ExpensesOutput({ expenses, expensesPeriod }) {
   return (
      <View style={styles.container}>
         <ExpensesSummary
            expenses={DUMMY_EXPENSES}
            periodName={expensesPeriod}
         />
         <ExpensesList expenses={DUMMY_EXPENSES} />
      </View>
   );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 24,
      backgroundColor: GlobalStyles.colors.primary700,
   },
});
