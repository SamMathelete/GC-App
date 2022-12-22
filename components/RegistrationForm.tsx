import { FC } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import MainButton from "./MainButton";

const RegistrationForm: FC = () => {
  const buttonHandler = () => {};
  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>
        <TextInput style={styles.input} placeholder="Name" />
        <TextInput style={styles.input} placeholder="Institute Roll Number" />
        <TextInput style={styles.input} placeholder="Council" />
        <TextInput style={styles.input} placeholder="Event" />
        <MainButton
          onPress={buttonHandler}
          style={styles.button}
          styleText={styles.buttonText}
        >
          Register
        </MainButton>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 60,
    textAlign: "left",
    backgroundColor: "transparent",
    borderBottomWidth: 2,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 18,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  container: {
    backgroundColor: "#FFDB7D",
    paddingHorizontal: 32,
    paddingVertical: 50,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 52,
  },
  button: {
    width: 241,
    height: 85,
    borderRadius: 90,
    marginTop: 50,
    backgroundColor: "#FD6A00",
    elevation: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.75,
  },
  buttonText: {
    fontSize: 30,
    color: "white",
  },
});

export default RegistrationForm;
