import { FC } from "react";
import { FlatList, Text, View } from "react-native";
import { ImageBackground, StyleSheet } from "react-native";

import { TEAM_RANKINGS } from "../data/ranking";
const RankingScreen: FC = () => {
  type Team = {
    name: string;
    score: number;
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Images/bg.jpg")}
        style={styles.bgImage}
      >
        <View style={styles.rootContainer}>
          <Text style={styles.Text}>GC LeaderBoard</Text>
          <View style={styles.leaderboard}>
            <FlatList
              data={TEAM_RANKINGS}
              renderItem={({ item }) => (
                <View style={styles.team}>
                  <Text style={styles.teamText}>{item.name}</Text>
                  <Text style={styles.teamText}>{item.score}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RankingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },
  Text: {
    color: "#FFDB7D",
    fontSize: 30,
    marginVertical: 20,
    fontWeight: "bold",
    fontVariant: ["small-caps"],
  },
  leaderboard: {
    width: "80%",
    backgroundColor: "#FFDB7D",
    borderRadius: 10,
    marginTop: 20,
    paddingBottom: 5,
  },
  team: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "#EF8100",
    marginHorizontal: 5,
    marginTop: 5,
  },
  teamText: {
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 15,
    color: "#E9E9E9",
  },
});
