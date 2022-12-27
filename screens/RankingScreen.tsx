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
              <View style={styles.imageViewSilver}>
                <Image source={require("../assets/Images/teamImage.png")} 
                  style={styles.image}
                />
              </View>
              <Text style={styles.teamNameSilver}>{sortedTeamRanking[1].name}</Text>
              <Text style={styles.teamScoreSilver}>{sortedTeamRanking[1].score}</Text>
          </View>
          {/* 1ST WINNER */}
          <View style={styles.winnerElement1}>
              <View style={styles.imageViewGold}>
                <Image source={require("../assets/Images/teamImage.png")} 
                  style={styles.imageGold}
                />
              </View>
              <Text style={styles.teamNameGold}>{sortedTeamRanking[0].name}</Text>
              <Text style={styles.teamScoreGold}>{sortedTeamRanking[0].score}</Text>
          </View>
          {/* 3RD WINNER */}
          <View style={styles.winnerElement3}>
              <View style={styles.imageViewBronze}>
                <Image source={require("../assets/Images/teamImage.png")} 
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
  },
  winnerView: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 3,
    width: "98%",
    borderRadius: 25,
    borderWidth: 4,
    borderColor: "#FFCC73",
    backgroundColor: "#FF8E09",
    elevation: 20,
  },
  winnerElement2: {
    //borderWidth: 1,
    paddingTop: 100,
    position: "relative",
    zIndex: 1,
    paddingRight: 55,
    paddingLeft: 7,
    alignItems: "center",
  },
  winnerElement1: {
    paddingTop: 7,
    position: "absolute",
    zIndex: 2,
    alignItems: "center",
  },
  winnerElement3: {
    //borderWidth: 1,
    paddingTop: 100,
    position: "relative",
    alignItems: "center",
    paddingLeft: 55,
    paddingRight: 7,
    zIndex: 1,
  },
  imageViewGold: {
    overflow: "hidden",
    height: 175,
    width: 175,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderColor: "#FFEC40",
    borderWidth: 6,
    elevation: 30,
    shadowColor: "#000000",
    //borderWidth: 1,
  },
  imageGold: {
    height: 175,
    width: 175,
  },
  imageViewSilver: {
    overflow: "hidden",
    height: 125,
    width: 125,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E6E6E6",
    borderWidth: 6,
    borderRadius: 100,
    //borderWidth: 1,
  },
  imageViewBronze: {
    overflow: "hidden",
    height: 125,
    width: 125,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#CC6C05",
    borderWidth: 6,
    borderRadius: 100,
    //borderWidth: 1,
  },
  image: {
    height: 125,
    width: 125,
  },
  teamNameGold: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FCFF58",

  },
  teamScoreGold: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FEF1DD",
  },
  teamNameSilver: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFEB88",

  },
  teamScoreSilver: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FEF1DD",
  },
  teamNameBronze: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFEB88",

  },
  teamScoreBronze: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FEF1DD",
  },
  leaderboard: {
    marginVertical: 10,
    width: "100%",
    alignContent: "stretch",
    alignItems: "stretch",
  },
});
