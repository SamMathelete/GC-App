import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

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
    <View style={styles.rootContainer}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: logo }} style={{ width: 100, height: 100 }} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerSmallText}>Team Name</Text>
          <Text style={styles.headerBigText}>{teamName}</Text>
        </View>
        <View>
          <Text style={styles.headerSmallText}>Total Score</Text>
          <Text style={styles.headerBigText}>{teamTotalScore}</Text>
        </View>
      </View>
      <View style={styles.scoreContainer}>
        {teamScoreList.map((teamScore) => (
          <View style={styles.individualScore}>
            <Text style={styles.mediumText}>{teamScore.eventName}</Text>
            <Text style={styles.mediumText}>{teamScore.points}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TeamScoreScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
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
    margin: 20,
    alignItems: "center",
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
