import { FC } from "react";
import { StyleSheet, View } from "react-native";
import LiveEventCreationForm from "../components/LiveEventCreationForm";
import Colors from "../constants/Colors";

const LiveEventCreationScreen: FC = () => {
  return (
    <View style={styles.rootContainer}>
      <LiveEventCreationForm />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.OffWhite,
  },
});

export default LiveEventCreationScreen;
