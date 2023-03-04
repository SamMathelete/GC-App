import { FC } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Colors from "../constants/Colors";
import CulturalResultsScreen from "./CulturalResultsScreen";
import TechResultsScreen from "./TechResultsScreen";
import SportsResultsScreen from "./SportsResultsScreen";

const Tab = createMaterialTopTabNavigator();

const ResultsScreen: FC = () => {
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
          component={TechResultsScreen}
          options={{ tabBarLabel: "Tech" }}
        />
        <Tab.Screen
          name="Cultural"
          component={CulturalResultsScreen}
          options={{ tabBarLabel: "Cultural" }}
        />
        <Tab.Screen
          name="Sports"
          component={SportsResultsScreen}
          options={{ tabBarLabel: "Sports" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ResultsScreen;

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
