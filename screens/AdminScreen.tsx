import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import MainButton from "../components/MainButton";
import { AuthContext } from "../store/google-auth";
import Colors from "../constants/Colors";

type RootParamList = {
  AdminHome: undefined;
  LiveEventCreationScreen: undefined;
  LiveEventEditScreen: undefined;
  SendNotificationScreen: undefined;
};

type Props = NativeStackScreenProps<RootParamList, "AdminHome">;

const allowedEmails = [
  "21ec01021@iitbbs.ac.in",
  "21cs01061@iitbbs.ac.in",
  "21mm02005@iitbbs.ac.in",
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

const AdminScreen: FC<Props> = ({ navigation }) => {
  const ctx = useContext(AuthContext);

  const email = ctx?.email;

  if (email === null || !allowedEmails.includes(email)) {
    return (
      <View style={styles.container}>
        <Text>You are not authorized to access this page.</Text>
      </View>
    );
  }

  const onAddLiveEvent = () => {
    console.log("Add Live Event");
    navigation.navigate("LiveEventCreationScreen");
  };

  const onUpdateLiveEvents = () => {
    console.log("Update Live Events");
    navigation.navigate("LiveEventEditScreen");
  };

  const onSendNotification = () => {
    console.log("Send Notification");
    navigation.navigate("SendNotificationScreen");
  };

  return (
    <View style={styles.container}>
      <View>
        <MainButton style={styles.buttons} onPress={onAddLiveEvent}>
          Add Live Event
        </MainButton>
        <MainButton style={styles.buttons} onPress={onUpdateLiveEvents}>
          Update Live Events
        </MainButton>
        <MainButton style={styles.buttons} onPress={onSendNotification}>
          Send Notification
        </MainButton>
      </View>
    </View>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.OffWhite,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 10,
  },
});
