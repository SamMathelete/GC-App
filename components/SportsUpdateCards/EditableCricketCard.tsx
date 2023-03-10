import { FC } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Colors from "../../constants/Colors";

type RootParamList = {
  CricketLiveEditScreen: {
    id: string;
  };
};

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
  logo: ImageSourcePropType | undefined;
};

interface Props {
  matchName: string;
  team1: Team;
  team2: Team;
  team1Score: number;
  team2Score: number;
  team1Wickets: number;
  team2Wickets: number;
  striker: Batsman;
  nonStriker: Batsman;
  bowler: Bowler;
  venue: string;
  overs: number;
  battingTeam: string;
}

const Football: FC<Props> = ({
  matchName,
  team1,
  team2,
  team1Score,
  team2Score,
  team1Wickets,
  team2Wickets,
  striker,
  nonStriker,
  bowler,
  venue,
  overs,
  battingTeam
}) => {
  const navigation = useNavigation<NativeStackScreenProps<RootParamList>>();

  const newMatchName = matchName.includes(".")
    ? matchName.replace(".", "")
    : matchName;

  const id = `Cricket_${newMatchName}`;

  const editEvent = () => {
    navigation.navigate("CricketLiveEditScreen", { id });
  };

  return (
    <Pressable style={styles.rootContainer} onPress={editEvent}>
      <Text style={styles.titleText}>{matchName}</Text>
      <Text style={styles.venueText}>{venue}</Text>
      <View style={styles.mainContainer}>
        <View style={styles.teamContainer}>
          <Image style={styles.teamImage} source={team1.logo} />
          <Text style={styles.teamText}>{team1.teamName}</Text>
          <Text style={styles.scoreText}>
            {team1Score}/{team1Wickets}
          </Text>
        </View>

        <View style={styles.midContainer}>
          <View style={styles.overContainer}>
            <Text style={styles.overText}>Over {overs}</Text>
          </View>
          <View>
            <Text style={styles.infoText}>
              {striker.playerName} {"*  "}
              {striker.runs}
              {"("}
              {overs}
              {")"}
            </Text>
            <Text style={styles.infoText}>
              {nonStriker.playerName}
              {"  "}
              {nonStriker.runs}
              {"("}
              {overs}
              {")"}
            </Text>
            <Text style={[styles.infoText, { paddingTop: 14, paddingBottom: 10 }]}>
              {bowler.playerName}
              {"  "}
              {bowler.wickets}
              {"/"}
              {bowler.runs}
            </Text>
          </View>
          <Text style={{textAlign: "center"}}> Batting: {battingTeam}</Text>
        </View>

        <View style={styles.teamContainer}>
          <Image style={styles.teamImage} source={team2.logo} />
          <Text style={styles.teamText}>{team2.teamName}</Text>
          <Text style={styles.scoreText}>
            {team2Score}/{team2Wickets}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Football;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "column",
    alignItems: "center",
    margin: 12,
    backgroundColor: Colors.purpleLight,
    borderRadius: 30,
    elevation: 10,
  },
  titleText: {
    fontSize: 22,
    marginTop: 10,
    color: Colors.OffWhite,
    fontWeight: "bold",
  },
  venueText: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.OffWhite,
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.OffWhite,
    height: 175,
    borderRadius: 24,
    marginHorizontal: 10,
    marginBottom: 10,
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
