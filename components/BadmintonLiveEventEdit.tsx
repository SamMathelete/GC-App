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
import Badminton from "./SportsUpdateCards/Badminton";
import DropDown from "react-native-paper-dropdown";
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
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  addDoc,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firestoreConfig";

interface Props {
  matchName: string;
  team1: string;
  score1: string;
  team2: string;
  score2: string;
  setscore1: string;
  setscore2: string;
  matchTime: string;
  venue: string;
  date: string;
  id: string;
}

type RootParamList = {
  LiveEventEditScreen: undefined;
};

const BadmintonLiveEventEdit: FC<Props> = (props) => {
  const [matchName, setMatchName] = useState(props.matchName);
  const [team1, setTeam1] = useState(props.team1);
  const [team2, setTeam2] = useState(props.team2);
  const [score1, setScore1] = useState(props.score1);
  const [score2, setScore2] = useState(props.score2);
  const [venue, setVenue] = useState(props.venue);
  const [matchTime, setMatchTime] = useState(props.matchTime);
  const [setscore1, setSetscore1] = useState(props.setscore1);
  const [setscore2, setSetscore2] = useState(props.setscore2);
  const [isLive, setIsLive] = useState(true);

  const navigation = useNavigation<NativeStackScreenProps<RootParamList>>();

  const buttonHandler = async () => {
    await updateDoc(doc(db, "liveEvents", props.id), {
      score1: score1,
      score2: score2,
      setscore1: setscore1,
      setscore2: setscore2,
      matchTime: matchTime,
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
    //       score2: score2,
    //       setscore1: setscore1,
    //       setscore2: setscore2,
    //       matchTime: matchTime,
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
    score2: "",
    setscore1: "",
    setscore2: "",
    date: "",
    matchTime: "",
    team1Logo: require("../assets/Images/teamImage.png"),
    team2Logo: require("../assets/Images/teamImage.png"),
    isLive: true,
  });

  const fetchLiveEvent = async () => {
    const data = await getDoc(doc(db, "liveEvents", props.id));
    // const response = await fetch(
    //   `https://gc-app-76138-default-rtdb.firebaseio.com/liveEvents/${props.id}.json`
    // );
    setMatchData(data.data());
  };

  useEffect(() => {
    fetchLiveEvent();
  }, []);

  useEffect(() => {
    setScore1(matchData.score1);
    setScore2(matchData.score2);
    setMatchName(matchData.matchName);
    setTeam1(matchData.team1);
    setTeam2(matchData.team2);
    setVenue(matchData.venue);
    setMatchTime(matchData.matchTime);
    setSetscore1(matchData.setscore1);
    setSetscore2(matchData.setscore2);
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
      <Badminton
        matchName={matchName}
        team1={{
          teamName: team1,
          score: score1,
          setScore: setscore1,
          logo: matchData.team1Logo,
        }}
        team2={{
          teamName: team2,
          score: score2,
          setScore: setscore2,
          logo: matchData.team2Logo,
        }}
        time={matchTime}
        venue={venue}
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
          </View>
        </View>
        <View style={styles.columnView}>
          <TextInput
            label="Match Time"
            mode="outlined"
            value={matchTime}
            onChangeText={(time) => setMatchTime(time)}
            style={styles.input}
            placeholder="Match Time"
          />
        </View>
        <View style={styles.columnView}>
          <TextInput
            label="Team 1 Set Score"
            mode="outlined"
            value={setscore1}
            onChangeText={(score) => setSetscore1(score)}
            style={[
              styles.input,
              {
                width: 200,
              },
            ]}
            placeholder="Team 1 Set Score"
          />
          <TextInput
            label="Team 2 Set Score"
            mode="outlined"
            value={setscore2}
            onChangeText={(score) => setSetscore2(score)}
            style={[
              styles.input,
              {
                width: 200,
              },
            ]}
            placeholder="Team 2 SET Score"
          />
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
    width: 310,
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

export default BadmintonLiveEventEdit;
