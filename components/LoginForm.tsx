import { FC } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
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

const LoginForm: FC<Props> = ({ onSignUpPress, onLoginPress }) => {
  const loginHandler = () => {
    onLoginPress();
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={styles.rootContainer}>
        <Text style={styles.mainText}>Login</Text>
        <TextInput style={styles.input} placeholder="Institute Email ID" />
        <TextInput style={styles.input} placeholder="Password" />
        <MainButton
          style={styles.mainButton}
          styleText={styles.mainButtonText}
          onPress={loginHandler}
        >
          Login
        </MainButton>
        <SideButton
          style={styles.sideButton}
          styleText={styles.sideButtonText}
          onPress={onSignUpPress}
        >
          Sign Up
        </SideButton>
        <Pressable style={styles.bottom}>
          <Text style={styles.bottomText}>Forgot Password</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 24,
    marginTop: "30%",
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
    height: 60,
    textAlign: "left",
    backgroundColor: "#faf6eb",
    borderBottomWidth: 2,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 18,
    marginHorizontal: 5,
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
