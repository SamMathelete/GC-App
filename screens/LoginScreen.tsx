import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useContext, useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
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
};

type Props = NativeStackScreenProps<RootStackParamList, "LoginScreen">;

const allowedEmails = [
  "21ec01021@iitbbs.ac.in",
  "vpresident.sg@iitbbs.ac.in",
  "gsecsnt.sg@iitbbs.ac.in",
  "ugrep.sg@iitbbs.ac.in",
  "secyfebs.sg@iitbbs.ac.in",
  "secyrobotics.sg@iitbbs.ac.in",
  "secyastronomy.sg@iitbbs.ac.in",
  "secyprogsoc.sg@iitbbs.ac.in",
  "secyweb.sg@iitbbs.ac.in",
  "gseccul.sg@iitbbs.ac.in",
  "secydance.sg@iitbbs.ac.in",
  "secysfs.sg@iitbbs.ac.in",
  "quizclub@iitbbs.ac.in",
  "secyfinearts.sg@iitbbs.ac.in",
  "secydrams.sg@iitbbs.ac.in",
  "secylitsoc.sg@iitbbs.ac.in",
  "secycinesoc.sg@iitbbs.ac.in",
  "secymusic.sg@iitbbs.ac.in",
  "clix.photosoc@iitbbs.ac.in",
  "gsecsports.sg@iitbbs.ac.in",
  "secyathletics.sg@iitbbs.ac.in",
  "secybasketball.sg@iitbbs.ac.in",
  "secyvolleyball.sg@iitbbs.ac.in",
  "secytennis.sg@iitbbs.ac.in",
  "secycricket.sg@iitbbs.ac.in",
  "secyfootball.sg@iitbbs.ac.in",
  "secytabletennis.sg@iitbbs.ac.in",
  "secybadminton.sg@iitbbs.ac.in",
  "secyboardgames.sg@iitbbs.ac.in",
  "secygym.sg@iitbbs.ac.in",
  "coord.wissenaire@iitbbs.ac.in",
  "coord.almafiesta@iitbbs.ac.in",
  "coord.esummit@iitbbs.ac.in",
  "coord.ashvamedha@iitbbs.ac.in",
];

const LoginScreen: FC<Props> = ({ navigation }) => {
  const [admin, setAdmin] = useState(false);
  const ctx = useContext(AuthContext);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "663917460037-u83fd8fucki47ph4jg0igpofuhpuds9v.apps.googleusercontent.com",
    androidClientId:
      "663917460037-bqtmb5ne2tq1mmb8c1qkdt1d4re58e9l.apps.googleusercontent.com",
  });

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
              source={require("../assets/Images/webd-logo.png")}
              style={styles.image}
            />
            <Text style={{ color: Colors.OffWhite }}>
              Web and Design Society
            </Text>
            <Text style={{ color: Colors.OffWhite }}>IIT Bhubaneswar</Text>
          </View>
          <View style={styles.buttonContainer}>
            <MainButton onPress={loginHandler}>Student</MainButton>
            <SideButton onPress={bypassHandler}>Admin</SideButton>
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
    marginTop: 20,
    marginBottom: 80,
    justifyContent: "center",
    alignItems: "center",
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
    color: Colors.OffWhite,
  },
  mainImage: {
    width: 270,
    height: 270,
    marginBottom: 20,
    borderRadius: 135,
  },
});

export default LoginScreen;
