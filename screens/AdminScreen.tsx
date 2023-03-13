import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useContext, useEffect, useState } from "react";
import { Provider } from "react-native-paper";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import MainButton from "../components/MainButton";
import { AuthContext } from "../store/google-auth";
import Colors from "../constants/Colors";
import ScheduledEvent from "../modals/ScheduledEvent/ScheduledEvent";
import { db } from "../firestoreConfig";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

type RootParamList = {
  AdminHome: undefined;
  LiveEventCreationScreen: undefined;
  LiveEventEditScreen: undefined;
  SendNotificationScreen: undefined;
  AddCarouselImageScreen: undefined;
  NewsUpdateScreen: undefined;
  DeleteNewsScreen: undefined;
  EditCarouselImage: undefined;
  DeleteNotificationsScreen: undefined;
  EventResultFormScreen: undefined;
  DeleteScheduledEvent: undefined;
};

type Props = NativeStackScreenProps<RootParamList, "AdminHome">;

// const allowedEmails = [
//   "21cs02006@iitbbs.ac.in",
//   "21ec01054@iitbbs.ac.in",
//   "21ec01021@iitbbs.ac.in",
//   "21cs01061@iitbbs.ac.in",
//   "21mm02005@iitbbs.ac.in",
//   "21me02005@iitbbs.ac.in",
//   "vpresident.sg@iitbbs.ac.in",
//   "gsecsnt.sg@iitbbs.ac.in",
//   "ugrep.sg@iitbbs.ac.in",
//   "secyfebs.sg@iitbbs.ac.in",
//   "secyrobotics.sg@iitbbs.ac.in",
//   "secyastronomy.sg@iitbbs.ac.in",
//   "secyprogsoc.sg@iitbbs.ac.in",
//   "secyweb.sg@iitbbs.ac.in",
//   "gseccul.sg@iitbbs.ac.in",
//   "secydance.sg@iitbbs.ac.in",
//   "secysfs.sg@iitbbs.ac.in",
//   "quizclub@iitbbs.ac.in",
//   "secyfinearts.sg@iitbbs.ac.in",
//   "secydrams.sg@iitbbs.ac.in",
//   "secylitsoc.sg@iitbbs.ac.in",
//   "secycinesoc.sg@iitbbs.ac.in",
//   "secymusic.sg@iitbbs.ac.in",
//   "clix.photosoc@iitbbs.ac.in",
//   "gsecsports.sg@iitbbs.ac.in",
//   "secyathletics.sg@iitbbs.ac.in",
//   "secybasketball.sg@iitbbs.ac.in",
//   "secyvolleyball.sg@iitbbs.ac.in",
//   "secytennis.sg@iitbbs.ac.in",
//   "secycricket.sg@iitbbs.ac.in",
//   "secyfootball.sg@iitbbs.ac.in",
//   "secytabletennis.sg@iitbbs.ac.in",
//   "secybadminton.sg@iitbbs.ac.in",
//   "secyboardgames.sg@iitbbs.ac.in",
//   "20me01015@iitbbs.ac.in",
//   "coord.wissenaire@iitbbs.ac.in",
//   "coord.almafiesta@iitbbs.ac.in",
//   "coord.esummit@iitbbs.ac.in",
//   "coord.ashvamedha@iitbbs.ac.in",
// ];

const AdminScreen: FC<Props> = ({ navigation }) => {
  const ctx = useContext(AuthContext);
  //   const [email, setEmail] = useState<string | null>(null);
  const [scheduledEventModal, setScheduledEventModal] = useState(false);

  const onAddLiveEvent = () => {
    navigation.navigate("LiveEventCreationScreen");
  };

  const onUpdateLiveEvents = () => {
    navigation.navigate("LiveEventEditScreen");
  };

  const onSendNotification = () => {
    navigation.navigate("SendNotificationScreen");
  };
  const onAddScore = () => {
    navigation.navigate("AddScoreScreen");
  };

  const onAddCarouselImage = () => {
    navigation.navigate("AddCarouselImageScreen");
  };

  const onAddNews = () => {
    navigation.navigate("NewsUpdateScreen");
  };

  const onDeleteNews = () => {
    navigation.navigate("DeleteNewsScreen");
  };

  const onDeleteCarouselImage = () => {
    navigation.navigate("EditCarouselImage");
  };

  const onDeleteNotifications = () => {
    navigation.navigate("DeleteNotificationsScreen");
  };

  const onAddEventResult = () => {
    navigation.navigate("EventResultFormScreen");
  };

  const onDeleteScheduledEvent = () => {
    navigation.navigate("DeleteScheduledEvent");
  };
  const email = ctx?.email;

  const [isAllowed, setIsAllowed] = useState(false);

  const fetchEmailIds = async () => {
    const res = await getDoc(doc(db, "admins", "elevatedAdmins"));
    let data = [];
    data = res.data().email;
    if (data.includes(email)) {
      setIsAllowed(true);
    }
  };
  useEffect(() => {
    fetchEmailIds();
    //
  }, []);

  if (email === null || !isAllowed) {
    return (
      <View style={styles.container}>
        <Text>You are not authorized to access this page.</Text>
      </View>
    );
  }

  return (
    <Provider>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View>
          <ScheduledEvent
            visible={scheduledEventModal}
            setVisible={setScheduledEventModal}
          />
          {/* <MainButton
            style={styles.buttons}
            onPress={() => setScheduledEventModal(true)}
          >
            Add Scheduled Event
          </MainButton> */}
          {/* <MainButton style={styles.buttons} onPress={onDeleteScheduledEvent}>
            Delete Sch. Event
          </MainButton> */}
          <MainButton style={styles.buttons} onPress={onAddLiveEvent}>
            Add Live Event
          </MainButton>
          <MainButton style={styles.buttons} onPress={onUpdateLiveEvents}>
            Update Live Events
          </MainButton>
          <MainButton style={styles.buttons} onPress={onSendNotification}>
            Send Notification
          </MainButton>
          <MainButton style={styles.buttons} onPress={onDeleteNotifications}>
            Delete Notifications
          </MainButton>
          <MainButton style={styles.buttons} onPress={onAddScore}>
            Add Score
          </MainButton>
          <MainButton style={styles.buttons} onPress={onAddCarouselImage}>
            Add Carousel Image
          </MainButton>
          <MainButton style={styles.buttons} onPress={onDeleteCarouselImage}>
            Delete Carousel Image
          </MainButton>
          <MainButton style={styles.buttons} onPress={onAddNews}>
            Add News
          </MainButton>
          <MainButton style={styles.buttons} onPress={onDeleteNews}>
            Delete News
          </MainButton>
          <MainButton style={styles.buttons} onPress={onAddEventResult}>
            Add Event Result
          </MainButton>
        </View>
      </ScrollView>
    </Provider>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.OffWhite,
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
