import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import MainButton from "../components/MainButton";
import SideButton from "../components/SideButton";

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
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Images/bg.jpg")}
        style={styles.bgImage}
      >
        <View style={styles.rootContainer}>
          <View style={styles.mainContainer}>
            <Text style={styles.mainText}>General Championships</Text>
            <Text style={styles.mainText}>2023</Text>
          </View>
          <Image
            style={styles.mainImage}
            source={require("../assets/Images/gc-main.png")}
          />
          <View style={styles.imageContainer}>
            <Text>Powered By</Text>
            <Image
              source={require("../assets/Images/webd-logo.png")}
              style={styles.image}
            />
            <Text>Web and Design Society</Text>
            <Text>IIT Bhubaneswar</Text>
          </View>
          <View style={styles.buttonContainer}>
            <MainButton onPress={loginHandler}>Student Login</MainButton>
            <SideButton onPress={loginHandler}>Admin Login</SideButton>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginBottom: 80,
  },
  image: {
    width: 75,
    height: 75,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 2,
    color: "#FFDB7D",
  },
  mainImage: {
    width: 150,
    height: 150,
  },
});

export default LoginScreen;
