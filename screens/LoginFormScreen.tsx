import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

type RootParamList = {
  LoginFormScreen: undefined;
  Tabbed: undefined;
};

type Props = NativeStackScreenProps<RootParamList, "LoginFormScreen">;

const LoginFormScreen: FC<Props> = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const toggleSignUpLogin = () => {
    setIsLogin((isLogin) => !isLogin);
  };
  const onLoginPress = () => {
    navigation.navigate("Tabbed");
  };
  return (
    <ImageBackground
      source={require("../assets/Images/background.png")}
      style={styles.bgImage}
    >
      {isLogin && (
        <LoginForm
          onLoginPress={onLoginPress}
          onSignUpPress={toggleSignUpLogin}
        />
      )}
      {!isLogin && (
        <SignUpForm
          onLoginPress={toggleSignUpLogin}
          onSignUpPress={onLoginPress}
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginFormScreen;
