import { FC } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import RegistrationForm from "../components/RegistrationForm";
import Colors from "../constants/Colors";

const RegisterScreen: FC = () => {
  return (
    <View style={styles.rootContainer}>
      <RegistrationForm />
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

export default RegisterScreen;
