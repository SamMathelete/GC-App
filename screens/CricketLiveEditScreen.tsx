import { FC, useLayoutEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import CricketLiveEventEdit from "../components/CricketLiveEventEdit";
import Colors from "../constants/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  CricketLiveEditScreen: {
    id: string;
  };
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  "CricketLiveEditScreen"
>;

const CricketLiveEditScreen: FC<Props> = ({ route }) => {

  const id = route.params.id;
  const matchData = {
    id: id,
    matchName: "",
    type: "",
    venue: "",
    date: "",
    time: "",
    team1: "",
    team2: "",
    score1: "0",
    score2: "0",
    wickets1: "0",
    wickets2: "0",
    overs: "0.0",
    battingTeam: "",
    striker: "",
    nonStriker: "",
    bowler: "",
    strikerBalls: "0",
    strikerScore: "0",
    nonStrikerBalls: "0",
    nonStrikerScore: "0",
    bowlerRuns: "0.0",
    bowlerWickets: "0",
  };

  return (
    <View style={styles.rootContainer}>
      <CricketLiveEventEdit {...matchData} />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.OffWhite,
  },
});

export default CricketLiveEditScreen;
