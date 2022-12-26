import { FC } from "react";
import { FlatList, Text, View, Image } from "react-native";
import { ImageBackground, StyleSheet } from "react-native";

import { TEAM_RANKINGS } from "../data/ranking";
import TeamItem from "../components/TeamItem";
const RankingScreen: FC = () => {
  type Team = {
    name: string;
    score: number;
  };

  const sortedTeamRanking = TEAM_RANKINGS.slice().sort((a: Team, b: Team) => {
    return b.score - a.score;
  });
  const LEADERBOARD = sortedTeamRanking.slice(3);
  return (
      <ImageBackground
        source={require("../assets/Images/bg.jpg")}
        style={styles.rootContainer}
      >
        <View style={styles.winnerView}>
          {/* 2ND WINNER */}
          <View style={styles.winnerElement2}>
              <View style={styles.imageView}>
                <Image source={require("../assets/Images/silver.png")} 
                  style={styles.image}
                />
              </View>
              <Text style={styles.teamNameSilver}>{sortedTeamRanking[1].name}</Text>
              <Text style={styles.teamScoreSilver}>{sortedTeamRanking[1].score}</Text>
          </View>
          {/* 1ST WINNER */}
          <View style={styles.winnerElement1}>
              <View style={styles.imageViewGold}>
                <Image source={require("../assets/Images/gold.png")} 
                  style={styles.imageGold}
                />
              </View>
              <Text style={styles.teamNameGold}>{sortedTeamRanking[0].name}</Text>
              <Text style={styles.teamScoreGold}>{sortedTeamRanking[0].score}</Text>
          </View>
          {/* 3RD WINNER */}
          <View style={styles.winnerElement3}>
              <View style={styles.imageView}>
                <Image source={require("../assets/Images/bronze.png")} 
                  style={styles.image}
                />
              </View>
              <Text style={styles.teamNameBronze}>{sortedTeamRanking[2].name}</Text>
              <Text style={styles.teamScoreBronze}>{sortedTeamRanking[2].score}</Text>
          </View>
        </View>
        <View style={styles.leaderboard}>
          <FlatList
            data={LEADERBOARD}
            keyExtractor={(item) => item.name}
            renderItem={({ item, index }) => 
            ( 
               <TeamItem teamInfo={item} index={index+4}/>
            )}
          />
        </View>
      </ImageBackground>
  );
};

export default RankingScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  winnerView: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    margin: 3,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#002BA0",
    backgroundColor: "#2CBDF2",
    elevation: 20,
  },
  winnerElement2: {
    //borderWidth: 1,
    paddingTop: 75,
    position: "relative",
    zIndex: 1,
    paddingRight: 65,
    alignItems: "center",
  },
  winnerElement1: {
    paddingTop: 15,
    position: "absolute",
    zIndex: 2,
    alignItems: "center",
  },
  winnerElement3: {
    //borderWidth: 1,
    paddingTop: 100,
    position: "relative",
    alignItems: "center",
    paddingLeft: 65,
    zIndex: 1,
  },
  imageView: {
    overflow: "hidden",
    borderwidth: 1,
    height: 125,
    width: 125,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    //borderWidth: 1,
  },
  image: {
    height: 125,
    width: 125,
  },
  imageViewGold: {
    overflow: "hidden",
    height: 175,
    width: 175,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    elevation: 20,
    shadowColor: "#002BA0",
    //borderWidth: 1,
  },
  imageGold: {
    height: 175,
    width: 175,
  },
  teamNameGold: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF065",

  },
  teamScoreGold: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FDE400EA",
  },
  teamNameSilver: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E9DFDF",

  },
  teamScoreSilver: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#C2C2C2",
  },
  teamNameBronze: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F4C04F",

  },
  teamScoreBronze: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#EC9E00",
  },
  leaderboard: {
    flex: 1,
    width: "100%",
    alignContent: "stretch",
    alignItems: "stretch",
  },
});
