import { FC } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Linking,
  ScrollView,
} from "react-native";
// import { AntDesign } from "@expo/vector-icons";
// import Modal from 'react-native-modal';
import Colors from "../constants/Colors";
import EventResultCard from "./EventResultCard";
import { AuthContext } from "../store/google-auth";
import { useContext } from "react";

interface Props {
  style?: {};
  eventInfo: any;
  onPress: () => void;
  scrollViewRef: any;
  onScroll: any;
}

const EventSubPage: FC<Props> = ({
  style,
  eventInfo,
  onPress,
  scrollViewRef,
  onScroll,
}) => {
  const ctx = useContext(AuthContext);

  const isVisible = eventInfo.emails.includes(ctx.email) ? true : false;

  const handlePress = async () => {
    const supported = await Linking.canOpenURL(eventInfo.link);

    if (supported) {
      Linking.openURL(eventInfo.link);
    } else {
      console.log("Can't open URL");
    }
  };

  const generateDateString = (date, time) => {
    const dateObject = new Date(date);
    const timeArray = time.split(":").map((item) => parseInt(item));
    const hours = timeArray[0] >= 12 ? timeArray[0] - 12 : timeArray[0];
    const op = timeArray[0] >= 12 ? "PM" : "AM";
    return (
      dateObject
        .toDateString()
        .substring(0, dateObject.toDateString().length - 5) +
      ", " +
      hours.toString() +
      ":" +
      timeArray[1].toString().padStart(2, "0") +
      " " +
      op
    );
  };

  return (
    <View style={styles.modalView}>
      <Pressable onPress={onPress}>
        <View
          style={{
            borderWidth: 3,
            borderColor: Colors.red,
            width: 100,
            alignSelf: "center",
            borderRadius: 10,
          }}
        ></View>
      </Pressable>
      <Text style={styles.EventName}>{eventInfo.name}</Text>
      {eventInfo.isHeld && (
        <EventResultCard
          heading={"Result"}
          result={eventInfo.result}
          textColor={Colors.OffWhite}
        />
      )}
      <ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.ScrollingView}
      >
        <Text style={styles.Heading}>Description</Text>
        <Text style={styles.description}>{eventInfo?.description}</Text>
        <Text style={styles.Heading}>Guidelines</Text>
        <Text style={styles.description}>{eventInfo?.guidelines}</Text>
        {/* <Text style={styles.Heading}>Who can Participate?</Text>
        <Text style={styles.description}>{eventInfo?.description}</Text> */}
      </ScrollView>
      <View style={styles.Bottom}>
        <Text style={styles.Date}>
          {generateDateString(eventInfo?.date, eventInfo?.time)}
        </Text>
        <Text style={styles.Venue}>{eventInfo?.venue}</Text>
        {isVisible && (
          <View style={styles.registerButton}>
            <Pressable onPress={handlePress}>
              <Text style={styles.register}>Register</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default EventSubPage;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: Colors.purpleLight,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 10,
  },
  EventName: {
    color: Colors.OffWhite,
    fontSize: 35,
    margin: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  ScrollingView: {
    //borderWidth: 2,
    marginVertical: 5,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginHorizontal: 10,
    backgroundColor: Colors.purpleDark,
  },
  Heading: {
    color: Colors.red,
    fontSize: 22,
    marginLeft: 10,
  },
  Bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //borderTopWidth: 2,
    borderColor: Colors.red,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingVertical: 5,
    borderTopColor: Colors.red,
    borderTopWidth: 1,
  },
  description: {
    color: Colors.OffWhite,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  Date: {
    fontSize: 20,
    color: Colors.OffWhite,
    textAlign: "left",
    fontWeight: "bold",
  },
  Venue: {
    fontSize: 20,
    color: Colors.OffWhite,
    textAlign: "left",
    fontWeight: "bold",
  },
  registerButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 24,
    backgroundColor: Colors.red,
    elevation: 10,
    shadowColor: "#910101",
  },
  register: {
    fontSize: 24,
    color: Colors.OffWhite,
  },
});
