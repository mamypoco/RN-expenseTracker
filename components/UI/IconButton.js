import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Pressable, View } from "react-native";

function IconButton({ icon, size, color, onPress }) {
   return (
      <Pressable
         onPress={onPress}
         style={({ pressed }) => pressed && styles.pressed}
         android_ripple
      >
         <View style={styles.buttonContainer}>
            <Ionicons name={icon} size={size} color={color} />
         </View>
      </Pressable>
   );
}

//this is highly configurable customer component

export default IconButton;

const styles = StyleSheet.create({
   buttonContainer: {
      borderRedius: 24,
      padding: 5,
      margin: 8,
   },
   pressed: {
      opacity: 0.75,
   },
});
