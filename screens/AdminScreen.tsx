import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import MainButton from "../components/MainButton";

type RootParamList = {
  AdminHome: undefined;
  LiveEventCreationScreen: undefined;
  CricketLiveEditScreen: undefined;
  SendNotificationScreen: undefined;
};

type Props = NativeStackScreenProps<RootParamList, "AdminHome">;

const AdminScreen: FC<Props> = ({ navigation }) => {
  const onAddLiveEvent = () => {
    console.log("Add Live Event");
    navigation.navigate("LiveEventCreationScreen");
  };

  const onUpdateLiveEvents = () => {
    console.log("Update Live Events");
    navigation.navigate("CricketLiveEditScreen");
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
    backgroundColor: "#fff",
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
