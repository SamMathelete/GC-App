import { FC } from "react";
import { FlatList, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";

import CardView from "../components/CardView";
import { DUMMY_TECH_EVENTS, DUMMY_CULTURAL_EVENTS, DUMMY_SPORTS_EVENTS } from "../data/events";
const ScheduleScreen: FC = () => {
  return (
      <ImageBackground
      source={require("../assets/Images/bg.jpg")}
      style={styles.rootContainer}
      resizeMode="cover"
    >
      <ScrollView style={styles.rootContainer}>
        <View style={styles.rootContainer}>
          <Text style={styles.eventHeading}>Tech Council</Text>
          <View style={styles.eventList}>
          <FlatList
              data={DUMMY_TECH_EVENTS}
              renderItem={({item}) => <CardView eventInfo={item} />}
              horizontal={true}
          />
          </View>  
        </View>
        <View style={styles.rootContainer}>
          <Text style={styles.eventHeading}>Cultural Council</Text>
          <View style={styles.eventList}>
          <FlatList
              data={DUMMY_CULTURAL_EVENTS}
              renderItem={({item}) => 
              <CardView eventInfo={item} />}
              horizontal={true}
          />
          </View>  
        </View>
        <View style={styles.rootContainer}>
          <Text style={styles.eventHeading}>Sports Council</Text>
          <View style={styles.eventList}>
          <FlatList
              data={DUMMY_SPORTS_EVENTS}
              renderItem={({item}) => 
              <CardView eventInfo={item} />}
              horizontal={true}
          />
          </View>  
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingVertical: 10,
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