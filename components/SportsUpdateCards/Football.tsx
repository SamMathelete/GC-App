import { FC } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props {
  matchName: string;
  team1: string;
  teamLogo1: ImageSourcePropType;
  team2: string;
  teamLogo2: ImageSourcePropType;
  score1: string;
  score2: string;
  time: string;
  isPenalty: boolean;
  penaltyScore1?: string;
  penaltyScore2?: string;
  venue: string;
}

const Football: FC<Props> = ({
  matchName,
  teamLogo1,
  team1,
  teamLogo2,
  team2,
  score1,
  score2,
  time,
  isPenalty,
  penaltyScore1,
  penaltyScore2,
  venue,
}) => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.mainText}>{matchName}</Text>
      <View style={styles.mainContainer}>
        <View style={styles.teamContainer}>
          <Image style={styles.teamImage} source={teamLogo1} />
          <Text style={styles.subText}>{team1}</Text>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>{score1}</Text>
        </View>
        <View style={styles.midContainer}>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{time}</Text>
          </View>
          <View>
            <Text style={styles.barContainer}>-</Text>
          </View>
          {isPenalty && (
            <View style={styles.penaltyContainer}>
              <Text>
                {`Penalty: `}
                <Text style={styles.penaltyText}>
                  {penaltyScore1} - {penaltyScore2}
                </Text>
              </Text>
            </View>
          )}
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>{score2}</Text>
        </View>

        <View style={styles.teamContainer}>
          <Image style={styles.teamImage} source={teamLogo2} />
          <Text style={styles.subText}>{team2}</Text>
        </View>
      </View>
      <Text style={styles.mainText}>{venue}</Text>
    </View>
  );
};

export default Football;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "column",
    alignItems: "center",
    margin: 12,
    backgroundColor: "orange",
    borderRadius: 24,
  },
  mainText: {
    fontSize: 18,
    margin: 10,
    fontWeight: "500",
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    height: 175,
    borderRadius: 24,
  },
  teamContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  teamImage: {
    width: 80,
    height: 80,
    margin: 10,
  },
  scoreContainer: {
    margin: 5,
  },
  score: {
    fontSize: 40,
    fontWeight: "bold",
  },
  timeContainer: {
    marginVertical: -9,
    paddingTop: 0,
  },
  midContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  barContainer: {
    fontSize: 75,
  },
  penaltyContainer: {
    marginVertical: -4,
    justifyContent: "center",
    alignItems: "center",
  },
  subText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  penaltyText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  timeText: {
    color: "green",
    fontSize: 18,
    fontWeight: "bold",
  },
});
