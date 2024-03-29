import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../utils/date";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
   const [inputValues, setInputValue] = useState({
      amount: defaultValues ? defaultValues.amount.toString() : "",
      date: defaultValues ? getFormattedDate(defaultValues.date) : "",
      description: defaultValues ? defaultValues.description : "",
   });

   function inputChangedHandler(inputIdentifier, enteredValue) {
      setInputValue((curInputValues) => {
         return {
            ...curInputValues,
            [inputIdentifier]: enteredValue,
            //amount property equal to enteredValue, which allow us to dinamically target and set property names.
         };
      });
   }

   function submitHandler() {
      const expenseData = {
         amount: +inputValues.amount, //converts string to a number
         date: new Date(inputValues.date),
         description: inputValues.description,
      };
      onSubmit(expenseData);
   }

   return (
      <View style={styles.form}>
         <Text style={styles.title}>Your Expense</Text>
         <View style={styles.inputsRow}>
            <Input
               style={styles.rowInput}
               label="Amount"
               textInputConfig={{
                  keyboardType: "decimal-pad",
                  onChangeText: inputChangedHandler.bind(this, "amount"),
                  //2nd parameter enteredValue will be automatically passed by react native.
                  value: inputValues.amount,
               }}
            />
            <Input
               style={styles.rowInput}
               label="Date"
               textInputConfig={{
                  placeholder: "YYYY-MM-DD",
                  maxLength: 10,
                  onChangeText: inputChangedHandler.bind(this, "date"),
                  value: inputValues.date,
               }}
            />
         </View>
         <Input
            label="Description"
            textInputConfig={{
               multiline: true,
               // autoCapitalize: 'none'
               // autoCorrect: false //default is ture
               onChangeText: inputChangedHandler.bind(this, "description"),
               value: inputValues.description,
            }}
         />

         <View style={styles.buttons}>
            <Button style={styles.button} mode="flat" onPress={onCancel}>
               Cancel
            </Button>
            <Button style={styles.button} onPress={submitHandler}>
               {submitButtonLabel}
            </Button>
         </View>
      </View>
   );
}

export default ExpenseForm;

const styles = StyleSheet.create({
   form: {
      marginTop: 40,
   },
   title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
      marginVertical: 24,
      textAlign: "center",
   },
   inputsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
   },
   rowInput: {
      flex: 1,
   },
   buttons: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
   },
   button: {
      minWidth: 120,
      marginHorizontal: 8,
   },
});
