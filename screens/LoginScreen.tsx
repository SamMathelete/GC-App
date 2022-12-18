import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import MainButton from "../components/MainButton";

type RootStackParamList = {
  LoginScreen: undefined;
  Tabbed: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "LoginScreen">;

const LoginScreen: FC<Props> = ({ navigation, route }) => {
  const loginHandler = () => {
    navigation.navigate("Tabbed");
  };

  return (
    <View style={styles.rootContainer}>
      <Text>The Login Screen</Text>
      <MainButton onPress={loginHandler}>Login</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default LoginScreen;
