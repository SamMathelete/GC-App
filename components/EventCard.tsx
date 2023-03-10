import { FC, useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  DatePickerIOSComponent,
  useWindowDimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

import Modal from "react-native-modal";
import EventSubPage from "./EventSubPage";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";
interface Props {
  style?: {};
  eventInfo: {
    title: string;
    date?: string;
    time?: string;
    venue?: string;
    link: string;
    description?: string;
    isHeld?: boolean;
    emails: string[];
  };
}
const EventCard: FC<Props> = ({ style, eventInfo }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const modalCloseHandler = () => {
    setModalVisible(false);
    setIsPressed(false);
  };
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollViewRef = useRef(null);

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const handleScrollTo = (p: { x: number; y: number; animated: boolean }) => {
    if (scrollViewRef.current) {
      (scrollViewRef.current as any).scrollTo(p);
    }
  };

  const [isPressed, setIsPressed] = useState(false);

  // const handlePress = async () => {
  //     const supported = await Linking.canOpenURL(eventInfo.link);

  //     if (supported) {
  //         Linking.openURL(eventInfo.link);
  //     } else {
  //
  //     }
  // };

  const generateDateString = (date, time) => {
    const dateObject = new Date(date);
    const timeArray = time.split(":").map((item) => parseInt(item));
    const hours = timeArray[0] >= 12 ? timeArray[0] - 12 : timeArray[0];
    const op = timeArray[0] >= 12 ? "PM" : "AM";
    return (
      dateObject
        .toDateString()
        .substring(0, dateObject.toDateString().length - 5) +
      ",  " +
      hours.toString() +
      ":" +
      timeArray[1].toString().padStart(2, "0") +
      " " +
      op
    );
  };

  const Dimensions = useWindowDimensions();
  const width = Dimensions.width;

  return (
    <Pressable
      onPress={() => {
        setIsPressed(true);
        setModalVisible(true);
      }}
      style={[styles.rootContainer, style]}
    >
      <View
        style={[
          styles.topView,
          {
            width: width * 0.95,
          },
        ]}
      >
        <Text style={[styles.eventName, { width: width * 0.8 }]}>
          {eventInfo?.title}
        </Text>
        <Pressable
          android_ripple={{ color: "#FF4D00" }}
          onPress={() => {
            setIsPressed(true);
            setModalVisible(true);
          }}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          {!eventInfo.isHeld && (
            <AntDesign name="circledown" size={34} color={Colors.red} />
          )}
          {eventInfo.isHeld && (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: Colors.red,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 5,
                paddingVertical: 3,
              }}
            >
              <Text
                style={{
                  color: Colors.purpleLight,
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                  textAlignVertical: "center",
                  paddingHorizontal: 3,
                }}
              >
                Results
              </Text>
              <MaterialIcons
                name="insert-chart"
                size={24}
                color={Colors.purpleLight}
              />
            </View>
          )}
        </Pressable>
      </View>
      {isPressed && (
        <Modal
          isVisible={isModalVisible}
          style={{
            marginHorizontal: 0,
            marginBottom: 0,
            marginTop: 50,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
          onSwipeComplete={modalCloseHandler}
          useNativeDriverForBackdrop
          swipeDirection={["down"]}
          scrollTo={handleScrollTo}
          scrollOffset={scrollOffset}
          scrollOffsetMax={400 - 300} // content height - ScrollView height
          propagateSwipe={true}
          onBackButtonPress={modalCloseHandler}
          onBackdropPress={modalCloseHandler}
        >
          <EventSubPage
            onPress={modalCloseHandler}
            eventInfo={eventInfo}
            scrollViewRef={scrollViewRef}
            onScroll={handleOnScroll}
          />
        </Modal>
      )}
      <View style={styles.bottomView}>
        <View style={styles.eventDate}>
          {/* <Text style={styles.text}>{`${
            eventInfo.date
          } at ${eventInfo.time?.slice(0, 5)}`}</Text> */}
          <Text style={styles.text}>
            {generateDateString(eventInfo.date, eventInfo.time)}
          </Text>
        </View>
        <View style={styles.eventVenue}>
          <Text style={styles.text}>{eventInfo?.venue}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  rootContainer: {
    margin: 8,
    borderRadius: 18,
    justifyContent: "space-between",
    backgroundColor: Colors.purpleLight,
    elevation: 10,
    overflow: "hidden",
  },
  cardView: {
    flex: 1,
    justifyContent: "space-between",
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: 340,
  },
  expanded: {
    padding: 10,
  },
  expandedBottom: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 10,
  },
  eventName: {
    color: Colors.OffWhite,
    fontSize: 25,
    fontWeight: "bold",
  },
  eventDate: {
    color: Colors.OffWhite,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 100,
  },
  eventVenue: {
    color: Colors.OffWhite,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.OffWhite,
    fontWeight: "bold",
  },
  description: {
    color: Colors.OffWhite,
  },
  expandText: {
    color: Colors.OffWhite,
    textAlign: "left",
    fontWeight: "bold",
  },
  expandedDate: {
    color: Colors.OffWhite,
    textAlign: "left",
    fontWeight: "bold",
  },
  expandedVenue: {
    color: Colors.OffWhite,
    textAlign: "left",
    fontWeight: "bold",
  },
  registerButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 24,
    backgroundColor: Colors.red,
    elevation: 10,
    shadowColor: "#910101",
  },
  register: {
    fontSize: 24,
    color: Colors.OffWhite,
  },

  modalView: {
    flex: 1,
    alignContent: "center",
    backgroundColor: Colors.purpleLight,
  },
});
