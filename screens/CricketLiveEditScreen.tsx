import { FC } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import CricketLiveEventEdit from "../components/CricketLiveEventEdit";
import RegistrationForm from "../components/RegistrationForm";
import Colors from "../constants/Colors";

const CricketLiveEditScreen: FC = () => {
  return (
    <View style={styles.rootContainer}>
      <CricketLiveEventEdit />
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

export default CricketLiveEditScreen;
