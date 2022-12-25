import { FC } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const ScheduleScreen: FC = () => {
  return (
    <ImageBackground
      source={require("../assets/Images/bg.jpg")}
      style={styles.rootContainer}
    >
      <Text>Schedule Screen</Text>
    </ImageBackground>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})