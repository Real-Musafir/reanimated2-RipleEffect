import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Ripple from "./component/Ripple";

export default function App() {
  return (
    <View style={styles.container}>
      <Ripple style={styles.ripple}>
        <Text style={{ fontSize: 25 }}>Tap</Text>
      </Ripple>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ripple: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    justifyContent: "center",
    alignItems: "center",

    elevation: 2, //this is for android
  },
});
