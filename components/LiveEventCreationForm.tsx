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

const LiveEventCreationForm: FC = () => {
  const buttonHandler = () => {};

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
  ];

  const createLiveEvent = () => {
    const liveEvent = {
      id: `${type}_${name}`,
      name: name,
      type: type,
      venue: venue,
      date: date,
      time: time,
      team1: team1,
      team2: team2,
    };
    console.log(liveEvent);
  };

  const [showDropDown, setShowDropDown] = useState(false);

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
        <TextInput
          style={styles.input}
          placeholder="Team 1"
          placeholderTextColor={Colors.red}
          onChangeText={(text) => setTeam1(text)}
          value={team1}
        />
        <TextInput
          style={styles.input}
          placeholder="Team 2"
          placeholderTextColor={Colors.red}
          onChangeText={(text) => setTeam2(text)}
          value={team2}
        />
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
