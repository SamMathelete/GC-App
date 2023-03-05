import { FC, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import EventCard from "../components/EventCard";
import {
  DUMMY_TECH_EVENTS,
  DUMMY_CULTURAL_EVENTS,
  DUMMY_SPORTS_EVENTS,
} from "../data/events";
import Colors from "../constants/Colors";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { db } from "../firestoreConfig";
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

const ScheduleScreen: FC = ({ navigation }) => {
  const [scheduledEvents, setScheduledEvents] = useState<DocumentData>([]);

  const calendarNavigate = () => {
    navigation.navigate("CalendarScreen", {
      events: scheduledEvents,
    });
  };

  navigation.setOptions({
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="calendar" color={color} size={size} />
    ),
    headerRight() {
      return (
        <View style={{ paddingRight: 20 }}>
          <Pressable onPress={calendarNavigate}>
            <Ionicons name="calendar" color={Colors.red} size={35} />
          </Pressable>
        </View>
      );
    },
  });

  const isFocused = useIsFocused();

  useEffect(() => {
    getDocs(collection(db, "scheduled-events")).then((snapshot) =>
      setScheduledEvents(snapshot.docs.map((doc) => doc.data()))
    );
    console.log("foc");
  }, [isFocused]);

  //sort scheduled events by date
  if (scheduledEvents.length > 0) {
    scheduledEvents.sort((a, b) => {
      console.log(a.date.localeCompare(b.date));
      return -1 * a.date.localeCompare(b.date);
    });
  }

  const TechScreen = (): JSX.Element => {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.eventList}>
          <FlatList
            data={scheduledEvents.filter((item) => item.stream === "Tech")}
            renderItem={({ item }) => <EventCard eventInfo={item} />}
          />
        </View>
      </View>
    );
  };

  const CulturalScreen = (): JSX.Element => {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.eventList}>
          <FlatList
            data={scheduledEvents.filter((item) => item.stream === "Cultural")}
            renderItem={({ item }) => <EventCard eventInfo={item} />}
          />
        </View>
      </View>
    );
  };

  const SportsScreen = (): JSX.Element => {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.eventList}>
          <FlatList
            data={scheduledEvents.filter((item) => item.stream === "Sports")}
            renderItem={({ item }) => <EventCard eventInfo={item} />}
          />
        </View>
      </View>
    );
  };

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName="Tech"
        screenOptions={{
          tabBarActiveTintColor: Colors.red,
          tabBarInactiveTintColor: Colors.OffWhite,
          tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
          tabBarStyle: { backgroundColor: Colors.purpleLight },
          tabBarPressColor: Colors.purpleDark,
          tabBarIndicatorStyle: { backgroundColor: Colors.red },
        }}
      >
        <Tab.Screen
          name="Tech"
          component={TechScreen}
          options={{ tabBarLabel: "Tech" }}
        />
        <Tab.Screen
          name="Cultural"
          component={CulturalScreen}
          options={{ tabBarLabel: "Cultural" }}
        />
        <Tab.Screen
          name="Sports"
          component={SportsScreen}
          options={{ tabBarLabel: "Sports" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.OffWhite,
  },
  eventHeading: {
    fontSize: 24,
    color: "#FEDC86",
    paddingStart: 10,
    fontWeight: "bold",
  },
  eventList: {
    paddingBottom: 75,
    backgroundColor: Colors.OffWhite,
  },
});
