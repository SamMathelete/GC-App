import { FC } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Batsman = {
  playerName: string;
  runs: number;
  balls: number;
};

type Bowler = {
  playerName: string;
  runs: number;
  wickets: number;
};

type Team = {
  teamName: string;
  runs: number;
  wickets: number;
  logo: ImageSourcePropType | undefined;
};

interface Props {
  matchName: string;
  team1: Team;
  team2: Team;
  striker: Batsman;
  nonStriker: Batsman;
  bowler: Bowler;
  balls: number;
  venue: string;
}

const generateOvers = (balls: number): string => {
  return Math.floor(balls / 6).toString() + "." + (balls % 6).toString();
};

const Football: FC<Props> = ({
  matchName,
  team1,
  team2,
  striker,
  nonStriker,
  bowler,
  balls,
  venue,
}) => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.mainText}>{matchName}</Text>
      <View style={styles.mainContainer}>
        <View style={styles.teamContainer}>
          <Image style={styles.teamImage} source={team1.logo} />
          <Text style={styles.teamText}>{team1.teamName}</Text>
          <Text style={styles.scoreText}>
            {team1.runs}/{team1.wickets}
          </Text>
        </View>

        <View style={styles.midContainer}>
          <View style={styles.overContainer}>
            <Text style={styles.overText}>Over {generateOvers(balls)}</Text>
          </View>
          <View>
            <Text style={styles.infoText}>
              {striker.playerName} {"*  "}
              {striker.runs}
              {"("}
              {generateOvers(striker.balls)}
              {")"}
            </Text>
            <Text style={styles.infoText}>
              {nonStriker.playerName}
              {"  "}
              {nonStriker.runs}
              {"("}
              {generateOvers(nonStriker.balls)}
              {")"}
            </Text>
            <Text style={[styles.infoText, { paddingTop: 14 }]}>
              {bowler.playerName}
              {"  "}
              {bowler.wickets}
              {"/"}
              {bowler.runs}
            </Text>
          </View>
        </View>

        <View style={styles.teamContainer}>
          <Image style={styles.teamImage} source={team2.logo} />
          <Text style={styles.teamText}>{team2.teamName}</Text>
          <Text style={styles.scoreText}>
            {team2.runs}/{team2.wickets}
          </Text>
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
    width: 50,
    height: 50,
    margin: 10,
  },
  scoreContainer: {
    margin: 5,
  },
  scoreText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  overContainer: {
    marginBottom: 15,
  },
  midContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingTop: 20,
  },
  barContainer: {
    fontSize: 75,
  },
  penaltyContainer: {
    marginVertical: -4,
    justifyContent: "center",
    alignItems: "center",
  },
  teamText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  infoText: {
    fontSize: 14,
    alignSelf: "center",
    paddingVertical: 2,
  },
  overText: {
    color: "green",
    fontSize: 18,
    fontWeight: "bold",
  },
});
