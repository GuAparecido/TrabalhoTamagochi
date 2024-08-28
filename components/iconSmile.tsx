import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

const iconSmile = () => {
  return (
    <View style={styles.icons}>
      <Ionicons
        name="happy"
        size={40}
        color="white"
        backgroundColor="#7D3106"
      />
    </View>
  );
};

export default iconSmile;

const styles = StyleSheet.create({
  icons: {
    backgroundColor: "#7D3106",
    width: 60,
    height: 60,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
