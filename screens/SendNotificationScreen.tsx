import { FC } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import SendNotificationForm from "../components/SendNotificationForm";
import Colors from "../constants/Colors";

const SendNotificationScreen: FC = () => {
  return (
    <View style={styles.rootContainer}>
      <SendNotificationForm />
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

export default SendNotificationScreen;
