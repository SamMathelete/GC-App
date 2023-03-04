import { FC, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import MainButton from "./MainButton";
import Colors from "../constants/Colors";
import DropDown from "react-native-paper-dropdown";
import {
  doc,
  updateDoc,
  increment,
  setDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "../firestoreConfig";

const types = [
  {
    label: "Tech",
    value: "Tech",
  },
  {
    label: "Cultural",
    value: "Cultural",
  },
  {
    label: "Sports",
    value: "Sports",
  },
];

const EventResultForm: FC = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [winner, setWinner] = useState("");
  const [runner1, setRunner1] = useState("");
  const [runner2, setRunner2] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const addResultHandler = async () => {
    const valid =
      name.trim().length > 0 &&
      type.trim().length > 0 &&
      winner.trim().length > 0 &&
      runner1.trim().length > 0 &&
      runner2.trim().length > 0;

    if (!valid) {
      alert("Please fill all the fields");
      return;
    }

    setIsLoading(true);
    await addDoc(collection(db, "results"), {
      id: `${type}-${name}`,
      name,
      type,
      winner,
      runner1,
      runner2,
    });
    setIsLoading(false);
    alert("Result added successfully");
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
            list={types}
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
          placeholder="Winner"
          placeholderTextColor={Colors.red}
          onChangeText={(text) => setWinner(text)}
          value={winner}
        />
        <TextInput
          style={styles.input}
          placeholder="1st Runners Up"
          placeholderTextColor={Colors.red}
          onChangeText={(text) => setRunner1(text)}
          value={runner1}
        />
        <TextInput
          style={styles.input}
          placeholder="2nd Runners Up"
          placeholderTextColor={Colors.red}
          onChangeText={(text) => setRunner2(text)}
          value={runner2}
        />
        <View
          style={{
            width: 300,
            height: 100,
            marginBottom: 0,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: 300,
              height: 10,
            }}
          />
        </View>
        {isLoading && (
          <View style={{ marginVertical: 40 }}>
            <ActivityIndicator size="large" color={Colors.red} />
          </View>
        )}
        {!isLoading && (
          <MainButton
            onPress={addResultHandler}
            style={styles.button}
            styleText={styles.buttonText}
          >
            Add Result
          </MainButton>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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

export default EventResultForm;
