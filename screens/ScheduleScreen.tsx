import { FC } from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import EventCard from "../components/EventCard";
import {
  DUMMY_TECH_EVENTS,
  DUMMY_CULTURAL_EVENTS,
  DUMMY_SPORTS_EVENTS,
} from "../data/events";
import Colors from "../constants/Colors";

const Tab = createMaterialTopTabNavigator();

const ScheduleScreen: FC = () => {


  const TechScreen = (): JSX.Element => {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.eventList}>
          <FlatList
            data={DUMMY_TECH_EVENTS}
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
            data={DUMMY_CULTURAL_EVENTS}
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
            data={DUMMY_SPORTS_EVENTS}
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
