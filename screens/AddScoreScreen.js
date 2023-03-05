import { StyleSheet, Text } from "react-native";
import { FC, useState, useContext, useEffect } from "react";
import { View, KeyboardAvoidingView, ScrollView } from "react-native";
import DropDown from "react-native-paper-dropdown";
import { TextInput } from "react-native-paper";
import ActivityIndicator from "react-native-paper";
import MainButton from "../components/MainButton";
import Colors from "../constants/Colors";
import {
  doc,
  updateDoc,
  increment,
  addDoc,
  setDoc,
  collection,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firestoreConfig";
import { AuthContext } from "../store/google-auth";
import { getDoc } from "firebase/firestore";

// Atomically increment the population of the city by 50.

const allowedEmails = [
  "21ec01021@iitbbs.ac.in",
  "vpresident.sg@iitbbs.ac.in",
  "gsecsnt.sg@iitbbs.ac.in",
  "ugrep.sg@iitbbs.ac.in",
  "gseccul.sg@iitbbs.ac.in",
  "gsecsports.sg@iitbbs.ac.in",
];

const AddScoreScreen = () => {
  const ctx = useContext(AuthContext);
  const email = ctx?.email;
  const [isAllowed, setIsAllowed] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [title, setTitle] = useState("");
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoding, setIsLoding] = useState(false);

  const [type, setType] = useState("");

  const fetchEmailIds = async () => {
    const res = await getDoc(doc(db, "admins", "adminEmails"));
    let data = [];
    data = res.data().email;
    if (data.includes(email)) {
      setIsAllowed(true);
    }
    console.log(data);
  };
  useEffect(() => {
    fetchEmailIds();
    // console.log(allowedEmails);
  }, []);

  if (email === null || !isAllowed) {
    return (
      <View style={styles.container}>
        <Text>You are not authorized to access this page.</Text>
      </View>
    );
  }

  const teams = [
    {
      label: "CSE",
      value: "CSE",
    },
    {
      label: "ECE+META",
      value: "ECE+META",
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
      value: "M.Tech",
    },
    {
      label: "M.Sc",
      value: "M.Sc",
    },
    {
      label: "PhD",
      value: "PHD",
    },
  ];

  const onSubmitHandler = async () => {
    const timestamp = Timestamp.now();
    console.log(title, description);
    // setIsLoding(true);
    const score = doc(db, "leaderboard", title);
    const Event = collection(db, title);

    await addDoc(Event, {
      eventName: eventName,
      points: description,
    });

    await updateDoc(score, {
      points: increment(description),
    });

    await setDoc(doc(db, "leaderboard-last-update", "last-updated"), {
      timestamp: timestamp,
    });

    setDescription("");
    setTitle("");
    setIsLoding(false);
    alert("Score Added");
  };

  // if (isLoding){
  //   return (<ActivityIndicator size="large" />)
  // }

  return (
    <View style={styles.rootContainer}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container}>
          <TextInput
            mode="outlined"
            label="Event"
            style={styles.input}
            placeholder="Event"
            value={eventName}
            onChangeText={(eventName) => setEventName(eventName)}
          />
          <View style={styles.input}>
            <DropDown
              label={"Team"}
              mode={"outlined"}
              value={title}
              setValue={setTitle}
              list={teams}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
            />
          </View>
          {/* <TextInput
          mode="outlined"
          label="Team"
          style={styles.input}
          placeholder="Team"
          value={title}
          onChangeText={(title) => setTitle(title)}
        /> */}

          <TextInput
            mode="outlined"
            label="Points"
            style={styles.input}
            placeholder="Points"
            value={description}
            onChangeText={(description) => setDescription(description)}
          />
          <MainButton
            onPress={onSubmitHandler}
            style={styles.button}
            styleText={styles.buttonText}
          >
            Submit
          </MainButton>
        </KeyboardAvoidingView>
      </ScrollView>
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
  input: {
    width: 300,
    height: 60,
    textAlign: "left",
    borderBottomWidth: 2,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 18,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  bigInput: {
    width: 300,
    height: 100,
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
    fontSize: 20,
    color: Colors.OffWhite,
  },
});

export default AddScoreScreen;
