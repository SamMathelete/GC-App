import { FC } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import RegistrationForm from "../components/RegistrationForm";

const RegisterScreen: FC = () => {
  return (
    <ImageBackground
      source={require("../assets/Images/bg.jpg")}
      style={styles.rootContainer}
    >
      <RegistrationForm />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegisterScreen;
