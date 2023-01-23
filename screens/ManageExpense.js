import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({ route, navigation }) {
   //to extract id by using route prop via react navigation since the page is component that is loaded as a screen.

   const expensesCtx = useContext(ExpensesContext);

   const editedExpenseId = route.params?.expenseId;
   //if params is undefined, don't drill into expenseId. If param is defined, expenseId drills into it. If we fail, it means we are adding. If proceed, we are editing.

   const isEditing = !!editedExpenseId;
   //!! makes falsy to false to add, truthy to true in order to edit.

   useLayoutEffect(() => {
      navigation.setOptions({
         title: isEditing ? "Edit Expense" : "Add Expense",
      });
   }, [navigation, isEditing]);

   function deleteExpenseHandler() {
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
   }

   function cancelHandler() {
      navigation.goBack();
   }

   function confirmHandler() {
      if (isEditing) {
         expensesCtx.updateExpense(editedExpenseId, {
            description: "Test!!",
            amount: 29.99,
            date: new Date("2023-01-18"),
         });
      } else {
         expensesCtx.addExpense({
            description: "Test",
            amount: 19.99,
            date: new Date("2023-01-19"),
         });
      }
      navigation.goBack();
   }

   return (
      <View style={styles.container}>
         <ExpenseForm />
         <View style={styles.buttons}>
            <Button style={styles.button} mode="flat" onPress={cancelHandler}>
               Cancel
            </Button>
            <Button style={styles.button} onPress={confirmHandler}>
               {isEditing ? "Update" : "Add"}
            </Button>
         </View>
         {isEditing && (
            <View style={styles.deleteContainer}>
               <IconButton
                  icon="trash"
                  color={GlobalStyles.colors.error500}
                  size={36}
                  onPress={deleteExpenseHandler}
               />
            </View>
         )}
      </View>
   );
}

export default ManageExpense;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 24,
      backgroundColor: GlobalStyles.colors.primary800,
   },
   buttons: {
      flexDirection: "row",
      justifyContent: "center",
      alilgnItems: "center",
   },
   button: {
      minWidth: 120,
      marginHorizontal: 8,
   },
   deleteContainer: {
      marginTop: 16,
      paddingTop: 8,
      borderTopWidth: 2,
      borderTopColor: GlobalStyles.colors.primary200,
      alignItems: "center",
   },
});
