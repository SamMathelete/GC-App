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

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import { AuthContext } from "../store/google-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firestoreConfig";
import { setDoc, doc } from "firebase/firestore";

import ScheduledEventsJSON from "../data/scheduled-events.json";

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
  //

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "663917460037-u83fd8fucki47ph4jg0igpofuhpuds9v.apps.googleusercontent.com",
    androidClientId:
      "663917460037-bqtmb5ne2tq1mmb8c1qkdt1d4re58e9l.apps.googleusercontent.com",
  });

  const creditNavigator = () => {
    navigation.navigate("AppCredits");
  };

  const bypassHandler = async () => {
    const token = await AsyncStorage.getItem("token");
    const email = await AsyncStorage.getItem("email");
    if (token && email) {
      ctx.authenticate(token);
      ctx.emailSetter(email);
      navigation.navigate("AdminHome");
    } else {
      setAdmin(() => true);
      promptAsync();
    }
  };

  const loginHandler = async () => {
    const token = await AsyncStorage.getItem("token");
    const email = await AsyncStorage.getItem("email");
    if (token && email) {
      ctx.authenticate(token);
      ctx.emailSetter(email);
      navigation.navigate("Tabbed");
    } else {
      setAdmin(() => false);
      promptAsync();
    }
  };

  const getEmail = async (accessToken: string) => {
    const email = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const emailJson = await email.json();
    const emailID = await emailJson.email;
    AsyncStorage.setItem("email", emailID);
    ctx.emailSetter(emailID);
  };

  const toBackend = async () => {
    let scheduledEvents = [];
    for (var i in ScheduledEventsJSON) {
      scheduledEvents.push(ScheduledEventsJSON[i]);
    }
    await setDoc(doc(db, "scheduled-events-array", "events-array"), {
      events: scheduledEvents,
    });
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      const token = authentication!.accessToken;
      AsyncStorage.setItem("token", token);
      getEmail(token);
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
            <MainButton onPress={loginHandler} styleText={{ fontSize: 22 }}>
              Login
            </MainButton>
            {/* <MainButton onPress={toBackend} styleText={{ fontSize: 22 }}>
              Push
            </MainButton> */}
            <Text onPress={bypassHandler} style={styles.adminText}>
              Admin
            </Text>
          </View>
          <Pressable style={styles.bottom} onPress={creditNavigator}>
            <Text style={styles.bottomText}>Development Credits</Text>
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
  adminText: {
    fontSize: 20,
    color: Colors.red,
    marginBottom: 40,
    // borderWidth: 1,
    // borderColor: Colors.OffWhite,
    // borderRadius: 30,
    // paddingVertical: 10,
    // paddingHorizontal: 40,
    // backgroundColor: Colors.purpleDark,
  },
});

export default LoginScreen;
