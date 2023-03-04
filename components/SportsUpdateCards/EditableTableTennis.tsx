import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import Colors from "../../constants/Colors";

type Team = {
  teamName: string;
  score: string;
  setScore: string | undefined;
  logo: ImageSourcePropType;
};

interface Props {
  matchName: string;
  team1: Team;
  team2: Team;
  time: string;
  venue: string;
}

type RootParamList = {
  TennisLiveEditScreen: {
    id: string;
  };
};

const TableTennis: FC<Props> = ({ matchName, team1, team2, time, venue }) => {
  const navigation = useNavigation<NativeStackScreenProps<RootParamList>>();

  const newMatchName = matchName.includes(".")
    ? matchName.replace(".", "")
    : matchName;

  const id = `TableTennis_${newMatchName}`;

  const editEvent = () => {
    navigation.navigate("TennisLiveEditScreen", { id });
  };

  return (
    <Pressable style={styles.rootContainer} onPress={editEvent}>
      <Text style={styles.titleText}>{matchName}</Text>
      <Text style={styles.venueText}>{venue}</Text>
      <View style={styles.mainContainer}>
        <View style={styles.teamContainer}>
          <Image style={styles.teamImage} source={team1.logo} />
          <Text style={styles.subText}>{team1.teamName}</Text>
        </View>

        <View style={styles.midContainer}>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{time}</Text>
          </View>
          <View style={styles.barContainer}>
            <Text style={styles.scoreText}>{team1.score}</Text>
            <Text style={styles.barText}>-</Text>
            <Text style={styles.scoreText}>{team2.score}</Text>
          </View>
          <View style={styles.barContainer}>
            <Text style={styles.setscoreText}>Sets:</Text>
            <Text style={styles.setscoreText}>{team1.setScore}</Text>
            <Text style={styles.setbarText}>-</Text>
            <Text style={styles.setscoreText}>{team2.setScore}</Text>
          </View>
        </View>

        <View style={styles.teamContainer}>
          <Image style={styles.teamImage} source={team2.logo} />
          <Text style={styles.subText}>{team2.teamName}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default TableTennis;

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
    marginBottom: 10,
    marginHorizontal: 10,
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
  scoreText: {
    fontSize: 30,
    marginHorizontal: 5,
  },
  setscoreText: {
    fontSize: 15,
    marginHorizontal: 5,
    alignSelf: "center",
    paddingVertical: 1,
  },
  timeContainer: {
    marginTop: 20,
    marginBottom: 15,
  },
  midContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  barText: {
    fontSize: 30,
    marginHorizontal: 7,
  },
  setbarText: {
    fontSize: 15,
    marginHorizontal: 2,
  },
  barContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  penaltyContainer: {
    marginVertical: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  subText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  penaltyText: {
    fontSize: 18,
    textAlign: "center",
  },
  timeText: {
    color: "green",
    fontSize: 18,
    fontWeight: "bold",
  },
});
