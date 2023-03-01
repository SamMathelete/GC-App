import { FC, useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-paper";
import MainButton from "./MainButton";
import Colors from "../constants/Colors";
import Football from "./SportsUpdateCards/Football";
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

interface Props {
  matchName: string;
  team1: string;
  score1: string;
  team2: string;
  score2: string;
  isPenalty: string;
  penaltyscore1: string;
  penaltyscore2: string;
  matchTime: string;
  venue: string;
  date: string;
  id: string;
}

type RootParamList = {
  LiveEventEditScreen: undefined;
};

const FootballLiveEventEdit: FC<Props> = (props) => {
  const [matchName, setMatchName] = useState(props.matchName);
  const [team1, setTeam1] = useState(props.team1);
  const [team2, setTeam2] = useState(props.team2);
  const [score1, setScore1] = useState(props.score1);
  const [score2, setScore2] = useState(props.score2);
  const [venue, setVenue] = useState(props.venue);
  const [matchTime, setMatchTime] = useState(props.matchTime);
  const [isPenalty, setIsPenalty] = useState(props.isPenalty);
  const [penaltyscore1, setPenaltyscore1] = useState(props.penaltyscore1);
  const [penaltyscore2, setPenaltyscore2] = useState(props.penaltyscore2);
  const [showDropDown, setShowDropDown] = useState(false);

  const navigation = useNavigation<NativeStackScreenProps<RootParamList>>();

  const buttonHandler = async () => {
    fetch(
      `https://gc-app-76138-default-rtdb.firebaseio.com/liveEvents/${props.id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score1: score1,
          score2: score2,
          penaltyscore1: penaltyscore1,
          penaltyscore2: penaltyscore2,
          isPenalty: isPenalty,
          matchTime: matchTime,
        }),
      }
    );
    alert("Event Updated Successfully!");
  };

  const deleteHandler = async () => {
    fetch(
      `https://gc-app-76138-default-rtdb.firebaseio.com/liveEvents/${props.id}.json`,
      {
        method: "DELETE",
      }
    );
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
    penaltyscore1: "",
    penaltyscore2: "",
    isPenalty: "",
    date: "",
    matchTime: "",
    team1Logo: require("../assets/Images/teamImage.png"),
    team2Logo: require("../assets/Images/teamImage.png"),
  });

  const fetchLiveEvent = async () => {
    const response = await fetch(
      `https://gc-app-76138-default-rtdb.firebaseio.com/liveEvents/${props.id}.json`
    );
    const data = await response.json();
    setMatchData(data);
    console.log(data);
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
    setIsPenalty(matchData.isPenalty);
    setPenaltyscore1(matchData.penaltyscore1);
    setPenaltyscore2(matchData.penaltyscore2);
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

  return (
    <ScrollView>
      <Football
        matchName={matchName}
        team1={{
          teamName: team1,
          score: score1,
          penaltyScore: penaltyscore1,
          logo: matchData.team1Logo,
        }}
        team2={{
          teamName: team2,
          score: score2,
          penaltyScore: penaltyscore2,
          logo: matchData.team2Logo,
        }}
        isPenalty={isPenalty}
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
          <View
            style={{
              width: 310,
            }}
          >
            <DropDown
              label={"Is Penalty"}
              mode={"outlined"}
              value={isPenalty}
              setValue={setIsPenalty}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              list={[
                {
                  label: "Yes",
                  value: "Yes",
                },
                {
                  label: "No",
                  value: "No",
                },
              ]}
            />
          </View>
          {isPenalty === "Yes" ? (
            <View style={styles.rowView}>
              <TextInput
                label="Team 1 Penalty Score"
                mode="outlined"
                value={penaltyscore1}
                onChangeText={(score) => setPenaltyscore1(score)}
                style={[
                  styles.input,
                  {
                    width: 145,
                  },
                ]}
                placeholder="Team 1 Penalty Score"
              />
              <TextInput
                label="Team 2 Penalty Score"
                mode="outlined"
                value={penaltyscore2}
                onChangeText={(score) => setPenaltyscore2(score)}
                style={[
                  styles.input,
                  {
                    width: 145,
                  },
                ]}
                placeholder="Team 2 Penalty Score"
              />
            </View>
          ) : null}
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

export default FootballLiveEventEdit;
