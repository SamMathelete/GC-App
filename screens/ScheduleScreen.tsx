import { FC } from "react";
import { FlatList, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EventCard from "../components/EventCard";
import { DUMMY_TECH_EVENTS, DUMMY_CULTURAL_EVENTS, DUMMY_SPORTS_EVENTS } from "../data/events";

const Tab = createMaterialTopTabNavigator();

const ScheduleScreen: FC = () => {
  const TechScreen =(): JSX.Element => {
    return(
      <View style={styles.rootContainer}>
          <View style={styles.eventList}>
          <FlatList
              data={DUMMY_TECH_EVENTS}
              renderItem={({item}) => 
              <EventCard eventInfo={item} />}
          />
          </View>  
    </View>
    );
  };

  const CulturalScreen =(): JSX.Element => {
    return(
      <View style={styles.rootContainer}>
          <View style={styles.eventList}>
          <FlatList
              data={DUMMY_CULTURAL_EVENTS}
              renderItem={({item}) => 
              <EventCard eventInfo={item} />}
          />
          </View>  
      </View>
    );
  }

  const SportsScreen =(): JSX.Element => {
    return(
    <View style={styles.rootContainer}>
      <View style={styles.eventList}>
      <FlatList
          data={DUMMY_SPORTS_EVENTS}
          renderItem={({item}) => 
          <EventCard eventInfo={item} />}
      />
      </View>  
    </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/Images/bg.jpg")}
      style={styles.rootContainer}
      resizeMode="cover"
    >
      <NavigationContainer independent={true}>
      <Tab.Navigator
      initialRouteName="Tech"
      screenOptions={{
        tabBarActiveTintColor: '#AD0000',
        tabBarInactiveTintColor: '#F7DFA1',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: '#FF961D' },
      }}
    >
      <Tab.Screen
        name="Tech"
        component={TechScreen}
        options={{ tabBarLabel: 'Tech' }}
      />
      <Tab.Screen
        name="Cultural"
        component={CulturalScreen}
        options={{ tabBarLabel: 'Cultural' }}
      />
      <Tab.Screen
        name="Sports"
        component={SportsScreen}
        options={{ tabBarLabel: 'Sports' }}
      />
    </Tab.Navigator>
      </NavigationContainer>
    </ImageBackground>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  eventHeading: {
    fontSize: 24,
    color: "#FEDC86",
    paddingStart: 10,
    fontWeight: "bold",
  },
  eventList: {
    backgroundColor: "#FFB968",
    paddingVertical: 10,
  },
})