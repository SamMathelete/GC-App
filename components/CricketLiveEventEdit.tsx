import { FC, useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { TextInput } from "react-native-paper";
import MainButton from "./MainButton";
import Colors from "../constants/Colors";
import Cricket from "./SportsUpdateCards/Cricket";
import CSE from "../assets/Images/CSE.png";
import ECEMETA from "../assets/Images/ECEMETA.png";
import EE from "../assets/Images/EE.png";
import ME from "../assets/Images/ME.png";
import CE from "../assets/Images/CE.png";
import MTECH from "../assets/Images/MTECH.png";
import MSC from "../assets/Images/MSC.png";
import PHD from "../assets/Images/PHD.png";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import DropDown from "react-native-paper-dropdown";
import {
  doc,
  updateDoc,
  increment,
  addDoc,
  collection,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firestoreConfig";

interface Props {
  matchName: string;
  team1: string;
  score1: string;
  wickets1: string;
  team2: string;
  score2: string;
  wickets2: string;
  bowler: string;
  bowlerRuns: string;
  bowlerWickets: string;
  striker: string;
  strikerScore: string;
  strikerBalls: string;
  nonStriker: string;
  nonStrikerScore: string;
  nonStrikerBalls: string;
  overs: string;
  battingTeam: string;
  time: string;
  venue: string;
  date: string;
  id: string;
}

type RootParamList = {
  LiveEventEditScreen: undefined;
};

const CricketLiveEventEdit: FC<Props> = (props) => {
  const [matchName, setMatchName] = useState(props.matchName);
  const [team1, setTeam1] = useState(props.team1);
  const [team2, setTeam2] = useState(props.team2);
  const [score1, setScore1] = useState(props.score1);
  const [wickets1, setWickets1] = useState(props.wickets1);
  const [score2, setScore2] = useState(props.score2);
  const [wickets2, setWickets2] = useState(props.wickets2);
  const [striker, setStriker] = useState(props.striker);
  const [strikerScore, setStrikerScore] = useState(props.strikerScore);
  const [strikerBalls, setStrikerBalls] = useState(props.strikerBalls);
  const [nonStriker, setNonStriker] = useState(props.nonStriker);
  const [nonStrikerScore, setNonStrikerScore] = useState(props.nonStrikerScore);
  const [nonStrikerBalls, setNonStrikerBalls] = useState(props.nonStrikerBalls);
  const [overs, setOvers] = useState(props.overs);
  const [battingTeam, setBattingTeam] = useState(props.battingTeam);
  const [showBattingDropDown, setShowBattingDropDown] = useState(false);
  const [bowler, setBowler] = useState(props.bowler);
  const [bowlerRuns, setBowlerRuns] = useState(props.bowlerRuns);
  const [bowlerWickets, setBowlerWickets] = useState(props.bowlerWickets);
  const [venue, setVenue] = useState(props.venue);
  const [isLive, setIsLive] = useState(true);

  // const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<NativeStackScreenProps<RootParamList>>();

  const buttonHandler = async () => {
    await updateDoc(doc(db, "liveEvents", props.id), {
      score1: score1,
      wickets1: wickets1,
      score2: score2,
      wickets2: wickets2,
      striker: striker,
      strikerScore: strikerScore,
      strikerBalls: strikerBalls,
      nonStriker: nonStriker,
      nonStrikerScore: nonStrikerScore,
      nonStrikerBalls: nonStrikerBalls,
      overs: overs,
      battingTeam: battingTeam,
      bowler: bowler,
      bowlerRuns: bowlerRuns,
      bowlerWickets: bowlerWickets,
    });

    // fetch(
    //   `https://gc-app-76138-default-rtdb.firebaseio.com/liveEvents/${props.id}.json`,
    //   {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       score1: score1,
    //       wickets1: wickets1,
    //       score2: score2,
    //       wickets2: wickets2,
    //       striker: striker,
    //       strikerScore: strikerScore,
    //       strikerBalls: strikerBalls,
    //       nonStriker: nonStriker,
    //       nonStrikerScore: nonStrikerScore,
    //       nonStrikerBalls: nonStrikerBalls,
    //       overs: overs,
    //       battingTeam: battingTeam,
    //       bowler: bowler,
    //       bowlerRuns: bowlerRuns,
    //       bowlerWickets: bowlerWickets,
    //     }),
    //   }
    // );
    alert("Event Updated Successfully!");
  };

  const deleteHandler = async () => {
    await updateDoc(doc(db, "liveEvents", props.id), {
      isLive: false,
    });
    // fetch(
    //   `https://gc-app-76138-default-rtdb.firebaseio.com/liveEvents/${props.id}.json`,
    //   {
    //     method: "DELETE",
    //   }
    // );
    alert("Event Ended Successfully!");
    navigation.navigate("LiveEventEditScreen");
  };

  const [matchData, setMatchData] = useState({
    matchName: "",
    team1: "",
    team2: "",
    venue: "",
    score1: "",
    wickets1: "",
    score2: "",
    wickets2: "",
    striker: "",
    strikerScore: "",
    strikerBalls: "",
    nonStriker: "",
    nonStrikerScore: "",
    nonStrikerBalls: "",
    overs: "",
    battingTeam: "",
    bowler: "",
    bowlerRuns: "",
    bowlerWickets: "",
    team1Logo: require("../assets/Images/teamImage.png"),
    team2Logo: require("../assets/Images/teamImage.png"),
    isLive: true,
  });

  const fetchLiveEvent = async () => {
    // const response = await fetch(
    //   `https://gc-app-76138-default-rtdb.firebaseio.com/liveEvents/${props.id}.json`
    // );
    const data = await getDoc(doc(db, "liveEvents", props.id));
    setMatchData(data.data());
  };

  useEffect(() => {
    fetchLiveEvent();
  }, []);

  useEffect(() => {
    setScore1(matchData.score1);
    setWickets1(matchData.wickets1);
    setScore2(matchData.score2);
    setWickets2(matchData.wickets2);
    setStriker(matchData.striker);
    setStrikerScore(matchData.strikerScore);
    setStrikerBalls(matchData.strikerBalls);
    setNonStriker(matchData.nonStriker);
    setNonStrikerScore(matchData.nonStrikerScore);
    setNonStrikerBalls(matchData.nonStrikerBalls);
    setOvers(matchData.overs);
    setBattingTeam(matchData.battingTeam);
    setBowler(matchData.bowler);
    setBowlerRuns(matchData.bowlerRuns);
    setBowlerWickets(matchData.bowlerWickets);
    setMatchName(matchData.matchName);
    setTeam1(matchData.team1);
    setTeam2(matchData.team2);
    setVenue(matchData.venue);
    setIsLive(matchData.isLive);
  }, [matchData]);

  let logo1;
  let logo2;

  switch (team1) {
    case "CSE":
      logo1 = CSE;
      break;
    case "ECEMETA":
      logo1 = ECEMETA;
      break;
    case "EE":
      logo1 = EE;
      break;
    case "ME":
      logo1 = ME;
      break;
    case "CE":
      logo1 = CE;
      break;
    case "MTECH":
      logo1 = MTECH;
      break;
    case "MSC":
      logo1 = MSC;
      break;
    case "PHD":
      logo1 = PHD;
      break;
    default:
      logo1 = require("../assets/Images/teamImage.png");
  }

  switch (team2) {
    case "CSE":
      logo2 = CSE;
      break;
    case "ECEMETA":
      logo2 = ECEMETA;
      break;
    case "EE":
      logo2 = EE;
      break;
    case "ME":
      logo2 = ME;
      break;
    case "CE":
      logo2 = CE;
      break;
    case "MTECH":
      logo2 = MTECH;
      break;
    case "MSC":
      logo2 = MSC;
      break;
    case "PHD":
      logo2 = PHD;
      break;
    default:
      logo2 = require("../assets/Images/teamImage.png");
  }

  if (!isLive) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>Event Ended</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Cricket
        matchName={matchName}
        team1={{
          teamName: team1,
          logo: matchData.team1Logo,
        }}
        team1Score={parseInt(score1)}
        team1Wickets={parseInt(wickets1)}
        team2={{
          teamName: team2,
          logo: matchData.team2Logo,
        }}
        team2Score={parseInt(score2)}
        team2Wickets={parseInt(wickets2)}
        venue={venue}
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
        battingTeam={battingTeam}
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
          <View style={{ width: 200 }}>
            <DropDown
              label={"Select Batting Team"}
              mode={"outlined"}
              value={battingTeam}
              setValue={setBattingTeam}
              visible={showBattingDropDown}
              showDropDown={() => setShowBattingDropDown(true)}
              onDismiss={() => setShowBattingDropDown(false)}
              list={[
                {
                  label: team1,
                  value: team1,
                },
                {
                  label: team2,
                  value: team2,
                },
              ]}
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
        <MainButton
          onPress={deleteHandler}
          style={styles.button}
          styleText={styles.buttonText}
        >
          End
        </MainButton>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.OffWhite,
  },
  text: {
    fontSize: 20,
    color: Colors.red,
    fontWeight: "bold",
    textAlign: "center",
  },
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
