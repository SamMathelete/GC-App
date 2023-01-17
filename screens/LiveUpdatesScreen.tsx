import { FC } from "react";
import { ScrollView, View, ImageBackground, StyleSheet } from "react-native";
import Football from "../components/SportsUpdateCards/Football";
import Colors from "../constants/Colors";

const LiveUpdatesScreen: FC = () => {
  return (
    <View style={styles.rootContainer}>
        <ScrollView>
          <Football
            matchName="GC Football Finals"
            team1={{
              teamName: "FCB",
              score: 3,
              penaltyScore: 5,
              logo: require("../assets/Images/Group13.png"),
            }}
            team2={{
              teamName: "RM",
              score: 3,
              penaltyScore: 2,
              logo: require("../assets/Images/Group12.png"),
            }}
            isPenalty={true}
            time="Full Time"
            venue="SAC Football Ground"
          />
          <Football
            matchName="GC Football Finals"
            team1={{
              teamName: "FCB",
              score: 3,
              penaltyScore: 5,
              logo: require("../assets/Images/Group13.png"),
            }}
            team2={{
              teamName: "RM",
              score: 3,
              penaltyScore: 2,
              logo: require("../assets/Images/Group12.png"),
            }}
            isPenalty={true}
            time="Full Time"
            venue="SAC Football Ground"
          />
          <Football
            matchName="GC Football Finals"
            team1={{
              teamName: "FCB",
              score: 3,
              penaltyScore: 5,
              logo: require("../assets/Images/Group13.png"),
            }}
            team2={{
              teamName: "RM",
              score: 3,
              penaltyScore: 2,
              logo: require("../assets/Images/Group12.png"),
            }}
            isPenalty={true}
            time="Full Time"
            venue="SAC Football Ground"
          />
          <View
            style={{
              flex: 1,
              height: 100,
            }}
          />
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.OffWhite,
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
});

export default LiveUpdatesScreen;
