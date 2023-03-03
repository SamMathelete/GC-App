import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Colors from "../constants/Colors";
interface TeamScoreType {
  eventName: string;
  points: number;
}

type RootParamList = {
  TeamScoreScreen: {
    teamName: string;
    logo: string;
    teamTotalScore: number;
    teamScoreList: TeamScoreType[];
  };
};

type Props = NativeStackScreenProps<RootParamList, "TeamScoreScreen">;

const TeamScoreScreen: FC<Props> = ({ route }) => {
  const { teamName, logo, teamTotalScore, teamScoreList } = route.params;
  console.log(logo);
  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: logo }} style={{ width: 50, height: 50 }} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerSmallText}>Team Name</Text>
          <Text style={styles.headerBigText}>{teamName}</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerSmallText}>Total Score</Text>
          <Text style={styles.headerBigText}>{teamTotalScore}</Text>
        </View>
      </View>
      <View style={styles.scoreContainer}>
        {teamScoreList.map((teamScore) => (
          <View key={teamScore.eventName} style={styles.individualScore}>
            <Text style={styles.mediumText}>{teamScore.eventName}</Text>
            <Text style={styles.mediumText}>{teamScore.points}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default TeamScoreScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.OffWhite,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 15,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    elevation: 15,
    borderColor: Colors.red,
    borderWidth: 1,
  },
  headerTextContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headerSmallText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerBigText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  scoreContainer: {
    flex: 10,
    flexDirection: "column",
    margin: 15,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 15,
  },
  individualScore: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    margin: 10,
  },
  mediumText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
