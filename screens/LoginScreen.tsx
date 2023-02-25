import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useContext, useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MainButton from "../components/MainButton";
import SideButton from "../components/SideButton";

import Colors from "../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import { AuthContext } from "../store/google-auth";

WebBrowser.maybeCompleteAuthSession();

type RootStackParamList = {
  LoginScreen: undefined;
  LoginFormScreen: undefined;
  Tabbed: undefined;
  AdminHome: undefined;
  AppCredits: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "LoginScreen">;

const LoginScreen: FC<Props> = ({ navigation }) => {
  const [admin, setAdmin] = useState(false);
  const ctx = useContext(AuthContext);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "663917460037-u83fd8fucki47ph4jg0igpofuhpuds9v.apps.googleusercontent.com",
    androidClientId:
      "663917460037-bqtmb5ne2tq1mmb8c1qkdt1d4re58e9l.apps.googleusercontent.com",
  });

  const creditNavigator = () => {
    navigation.navigate("AppCredits");
  };

  const bypassHandler = () => {
    setAdmin(() => true);
    promptAsync();
  };

  const loginHandler = () => {
    setAdmin(() => false);
    promptAsync();
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      ctx.authenticate(authentication!.accessToken);
      if (admin) {
        navigation.navigate("AdminHome");
      } else {
        navigation.navigate("Tabbed");
      }
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Images/background.png")}
        style={styles.bgImage}
      >
        <View style={styles.rootContainer}>
          <View style={styles.mainContainer}></View>
          <Image
            style={styles.mainImage}
            source={require("../assets/Images/GClogo2023.jpg")}
          />
          <View style={styles.imageContainer}>
            <Text style={{ color: Colors.OffWhite }}>Powered By</Text>
            <Image
              source={require("../assets/Images/gymkhana.png")}
              style={styles.image}
            />
            <Text style={{ color: Colors.OffWhite }}>Students' Gymkhana</Text>
            <Text style={{ color: Colors.OffWhite }}>IIT Bhubaneswar</Text>
          </View>
          <View style={styles.buttonContainer}>
            <MainButton onPress={loginHandler}>Student</MainButton>
            <SideButton onPress={bypassHandler}>Admin</SideButton>
          </View>
          <Pressable style={styles.bottom} onPress={creditNavigator}>
            <Text style={styles.bottomText}>App Credits</Text>
          </Pressable>
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
    marginTop: 30,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 75,
    height: 75,
    margin: 2,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
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
    color: Colors.OffWhite,
  },
  mainImage: {
    width: 270,
    height: 270,
    marginBottom: 30,
    borderRadius: 135,
  },
  bottom: {
    marginBottom: 60,
  },
  bottomText: {
    fontSize: 20,
    color: Colors.OffWhite,
  },
});

export default LoginScreen;
