import { FC } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import MainButton from "./MainButton";
import SideButton from "./SideButton";

interface Props {
  onSignUpPress: () => void;
  onLoginPress: () => void;
}

const SignUpForm: FC<Props> = ({ onSignUpPress, onLoginPress }) => {
  const signUpHandler = () => {
    onSignUpPress();
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={styles.rootContainer}>
        <Text style={styles.mainText}>Sign Up</Text>
        <TextInput style={styles.input} placeholder="Name" />
        <TextInput
          style={styles.input}
          autoCapitalize="characters"
          placeholder="Institute Roll Number"
        />
        <TextInput style={styles.input} placeholder="Institute Email ID" />
        <TextInput style={styles.input} placeholder="Password" />
        <TextInput style={styles.input} placeholder="Confirm Password" />
        <MainButton
          style={styles.mainButton}
          styleText={styles.mainButtonText}
          onPress={signUpHandler}
        >
          Sign Up
        </MainButton>
        <Text style={styles.midText}>Already have an account?</Text>
        <SideButton
          style={styles.sideButton}
          styleText={styles.sideButtonText}
          onPress={onLoginPress}
        >
          Login
        </SideButton>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 24,
    marginTop: "10%",
  },
  mainButton: {
    width: 225,
    height: 50,
    marginTop: 25,
    marginBottom: 15,
    backgroundColor: "#FD6A00",
  },
  sideButton: {
    width: 225,
    height: 50,
    borderColor: "#FD6A00",
  },
  mainButtonText: {
    color: "white",
  },
  sideButtonText: {
    color: "#FD6A00",
  },
  input: {
    width: 300,
    height: 50,
    textAlign: "left",
    backgroundColor: "#faf6eb",
    borderBottomWidth: 2,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 18,
    marginHorizontal: 5,
  },
  midText: {
    marginTop: 15,
    marginBottom: 10,
  },
  mainText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    marginTop: 24,
  },
  bottom: {
    marginTop: 5,
    marginBottom: 24,
  },
  bottomText: {
    fontSize: 18,
  },
});
