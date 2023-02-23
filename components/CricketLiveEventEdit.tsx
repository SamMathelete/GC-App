import { FC, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-paper";
import MainButton from "./MainButton";
import Colors from "../constants/Colors";
import Cricket from "./SportsUpdateCards/Cricket";

const CricketLiveEventEdit: FC = () => {
  const [score1, setScore1] = useState("0");
  const [wickets1, setWickets1] = useState("0");
  const [score2, setScore2] = useState("0");
  const [wickets2, setWickets2] = useState("0");
  const [striker, setStriker] = useState("Striker 1");
  const [strikerScore, setStrikerScore] = useState("0");
  const [strikerBalls, setStrikerBalls] = useState("0");
  const [nonStriker, setNonStriker] = useState("Striker 2");
  const [nonStrikerScore, setNonStrikerScore] = useState("0");
  const [nonStrikerBalls, setNonStrikerBalls] = useState("0");
  const [overs, setOvers] = useState("0.0");
  const [bowler, setBowler] = useState("Bowler 1");
  const [bowlerRuns, setBowlerRuns] = useState("0");
  const [bowlerWickets, setBowlerWickets] = useState("0");

  const buttonHandler = () => {};
  return (
    <ScrollView>
      <Cricket
        matchName="GC Cricket Finals"
        team1={{
          teamName: "India",
          logo: require("../assets/Images/Group13.png"),
        }}
        team1Score={parseInt(score1)}
        team1Wickets={parseInt(wickets1)}
        team2={{
          teamName: "Pakistan",
          logo: require("../assets/Images/Group12.png"),
        }}
        team2Score={parseInt(score2)}
        team2Wickets={parseInt(wickets2)}
        venue="MHR Ground"
        striker={{
          playerName: striker,
          runs: parseInt(strikerScore),
          balls: parseInt(strikerBalls),
        }}
        nonStriker={{
          playerName: nonStriker,
          runs: parseInt(nonStrikerScore),
          balls: parseInt(nonStrikerBalls),
        }}
        bowler={{
          playerName: bowler,
          runs: parseInt(bowlerRuns),
          wickets: parseInt(bowlerWickets),
        }}
        overs={parseFloat(overs)}
      />
      <MainButton
        onPress={buttonHandler}
        style={styles.smallButton}
        styleText={styles.smallButtonText}
      >
        Save
      </MainButton>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.columnView}>
          <View style={styles.rowView}>
            <TextInput
              label="Team 1 Score"
              mode="outlined"
              value={score1}
              onChangeText={(score) => setScore1(score)}
              style={[
                styles.input,
                {
                  width: 145,
                },
              ]}
              placeholder="Team 1 Score"
            />
            <TextInput
              label="Wickets"
              mode="outlined"
              value={wickets1}
              onChangeText={(wickets) => setWickets1(wickets)}
              style={[
                styles.input,
                {
                  width: 145,
                },
              ]}
              placeholder="Team 1 Wickets"
            />
          </View>
          <View style={styles.rowView}>
            <TextInput
              label="Team 2 Score"
              mode="outlined"
              value={score2}
              onChangeText={(score) => setScore2(score)}
              style={[
                styles.input,
                {
                  width: 145,
                },
              ]}
              placeholder="Team 2 Score"
            />
            <TextInput
              label="Wickets"
              mode="outlined"
              value={wickets2}
              onChangeText={(wickets) => setWickets2(wickets)}
              style={[
                styles.input,
                {
                  width: 145,
                },
              ]}
              placeholder="Team 2 Wickets"
            />
          </View>
        </View>
        <View style={styles.columnView}>
          <View style={styles.rowView}>
            <TextInput
              label="Striker"
              mode="outlined"
              value={striker}
              onChangeText={(striker) => setStriker(striker)}
              style={[
                styles.input,
                {
                  width: 120,
                },
              ]}
              placeholder="Striker"
            />
            <TextInput
              label="Score"
              mode="outlined"
              value={strikerScore}
              onChangeText={(score) => setStrikerScore(score)}
              style={[
                styles.input,
                {
                  width: 100,
                },
              ]}
              placeholder="Striker Score"
            />
            <TextInput
              label="Balls"
              mode="outlined"
              value={strikerBalls}
              onChangeText={(balls) => setStrikerBalls(balls)}
              style={[
                styles.input,
                {
                  width: 70,
                },
              ]}
              placeholder="Striker Balls"
            />
          </View>
          <View style={styles.rowView}>
            <TextInput
              label="Non-Striker"
              mode="outlined"
              value={nonStriker}
              onChangeText={(striker) => setNonStriker(striker)}
              style={[
                styles.input,
                {
                  width: 120,
                },
              ]}
              placeholder="Non-Striker"
            />
            <TextInput
              label="Score"
              mode="outlined"
              value={nonStrikerScore}
              onChangeText={(score) => setNonStrikerScore(score)}
              style={[
                styles.input,
                {
                  width: 100,
                },
              ]}
              placeholder="Non-Striker Score"
            />
            <TextInput
              label="Balls"
              mode="outlined"
              value={nonStrikerBalls}
              onChangeText={(balls) => setNonStrikerBalls(balls)}
              style={[
                styles.input,
                {
                  width: 70,
                },
              ]}
              placeholder="Non-Striker Balls"
            />
          </View>
        </View>
        <View style={styles.columnView}>
          <View style={styles.rowView}>
            <TextInput
              label="Overs"
              mode="outlined"
              value={overs}
              onChangeText={(overs) => setOvers(overs)}
              style={[
                styles.input,
                {
                  width: 310,
                },
              ]}
              placeholder="Overs"
            />
          </View>
          <View style={styles.rowView}>
            <TextInput
              label="Bowler"
              mode="outlined"
              value={bowler}
              onChangeText={(bowler) => setBowler(bowler)}
              style={[
                styles.input,
                {
                  width: 120,
                },
              ]}
              placeholder="Bowler"
            />
            <TextInput
              label="Runs"
              mode="outlined"
              value={bowlerRuns}
              onChangeText={(overs) => setBowlerRuns(overs)}
              style={[
                styles.input,
                {
                  width: 70,
                },
              ]}
              placeholder="Bowler Runs"
            />
            <TextInput
              label="Wickets"
              mode="outlined"
              value={bowlerWickets}
              onChangeText={(overs) => setBowlerWickets(overs)}
              style={[
                styles.input,
                {
                  width: 100,
                },
              ]}
              placeholder="Bowler Wickets"
            />
          </View>
        </View>
        <MainButton
          onPress={buttonHandler}
          style={styles.button}
          styleText={styles.buttonText}
        >
          Save
        </MainButton>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 50,
    textAlign: "left",
    borderBottomWidth: 2,
    marginBottom: 0,
    fontSize: 16,
    marginHorizontal: 1,
    borderRadius: 10,
  },
  container: {
    backgroundColor: Colors.OffWhite,
    borderColor: Colors.red,
    borderWidth: 2,
    paddingHorizontal: 32,
    paddingVertical: 50,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 150,
  },
  button: {
    width: 241,
    height: 85,
    borderRadius: 90,
    marginTop: 50,
    backgroundColor: Colors.red,
    elevation: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.75,
  },
  buttonText: {
    fontSize: 30,
    color: Colors.OffWhite,
  },
  smallButton: {
    width: 100,
    height: 50,
    alignSelf: "center",
    borderRadius: 90,
    marginTop: 20,
    backgroundColor: Colors.red,
    elevation: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.75,
  },
  smallButtonText: {
    fontSize: 20,
    color: Colors.OffWhite,
  },
  rowView: {
    flexDirection: "row",
    width: 310,
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  columnView: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default CricketLiveEventEdit;
