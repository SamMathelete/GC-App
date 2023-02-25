import { FC, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import MainButton from "./MainButton";
import Colors from "../constants/Colors";
import DropDown from "react-native-paper-dropdown";
import CSE from "../assets/Images/CSE.png";
import ECEMETA from "../assets/Images/ECEMETA.png";
import EE from "../assets/Images/EE.png";
import ME from "../assets/Images/ME.png";
import CE from "../assets/Images/CE.png";
import MTECH from "../assets/Images/MTECH.png";
import MSC from "../assets/Images/MSC.png";
import PHD from "../assets/Images/PHD.png";

const teams = [
  {
    label: "CSE",
    value: "CSE",
  },
  {
    label: "ECE+META",
    value: "ECEMETA",
  },
  {
    label: "EE",
    value: "EE",
  },
  {
    label: "ME",
    value: "ME",
  },
  {
    label: "CE",
    value: "CE",
  },
  {
    label: "M.Tech",
    value: "MTECH",
  },
  {
    label: "M.Sc",
    value: "MSC",
  },
  {
    label: "PhD",
    value: "PHD",
  },
];

const LiveEventCreationForm: FC = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");

  const typeList = [
    {
      label: "Cricket",
      value: "Cricket",
    },
    {
      label: "Football",
      value: "Football",
    },
    {
      label: "Basketball",
      value: "Basketball",
    },
    {
      label: "Volleyball",
      value: "Volleyball",
    },
  ];

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

  const createLiveEvent = async () => {
    const liveEvent = {
      id: `${type}_${name.includes(".") ? name.replace(".", "") : name}`,
      matchName: name,
      type: type,
      venue: venue,
      date: date,
      time: time,
      team1: team1,
      team1Logo: logo1,
      team2: team2,
      team2Logo: logo2,
      score1: 0,
      score2: 0,
      wickets1: 0,
      wickets2: 0,
      overs: 0.0,
      striker: "",
      nonStriker: "",
      bowler: "",
      strikerBalls: 0,
      strikerScore: 0,
      nonStrikerBalls: 0,
      nonStrikerScore: 0,
      bowlerRuns: 0.0,
      bowlerWickets: 0,
      isPenalty: "",
      matchTime: "",
      penaltyscore1: 0,
      penaltyscore2: 0,
    };
    console.log(liveEvent);
    try {
      await fetch(
        `https://gc-app-76138-default-rtdb.firebaseio.com/liveEvents/${liveEvent.id}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(liveEvent),
        }
      );
      console.log("Live Event Created");
      alert(
        `Live Event Created. ID is "${liveEvent.id}". Remember this ID(without the quotes) and use it to update the event.`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [showDropDown3, setShowDropDown3] = useState(false);

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>
        <View style={{ width: 300, height: 60, marginBottom: 20 }}>
          <DropDown
            label={"Type"}
            mode={"outlined"}
            value={type}
            setValue={setType}
            list={typeList}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={Colors.red}
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Venue"
          placeholderTextColor={Colors.red}
          onChangeText={(text) => setVenue(text)}
          value={venue}
        />
        <TextInput
          style={styles.input}
          placeholder="Date"
          placeholderTextColor={Colors.red}
          onChangeText={(text) => setDate(text)}
          value={date}
        />
        <TextInput
          style={styles.input}
          placeholder="Time"
          placeholderTextColor={Colors.red}
          onChangeText={(text) => setTime(text)}
          value={time}
        />
        <View
          style={{
            width: 300,
            height: 100,
            marginBottom: 0,
            justifyContent: "space-between",
          }}
        >
          <DropDown
            label={"Team 1"}
            mode={"outlined"}
            value={team1}
            setValue={setTeam1}
            list={teams}
            visible={showDropDown2}
            showDropDown={() => setShowDropDown2(true)}
            onDismiss={() => setShowDropDown2(false)}
          />
          <View
            style={{
              width: 300,
              height: 10,
            }}
          />
          <DropDown
            label={"Team 2"}
            mode={"outlined"}
            value={team2}
            setValue={setTeam2}
            list={teams}
            visible={showDropDown3}
            showDropDown={() => setShowDropDown3(true)}
            onDismiss={() => setShowDropDown3(false)}
          />
        </View>
        <MainButton
          onPress={createLiveEvent}
          style={styles.button}
          styleText={styles.buttonText}
        >
          Create Event
        </MainButton>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 60,
    textAlign: "left",
    backgroundColor: "transparent",
    borderBottomWidth: 2,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 18,
    marginHorizontal: 5,
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
    marginTop: 52,
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
    fontSize: 25,
    color: Colors.OffWhite,
  },
});

export default LiveEventCreationForm;
