import { StyleSheet } from "react-native";
import { FC, useState } from "react";
import { View, KeyboardAvoidingView, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import ActivityIndicator from "react-native-paper";
import MainButton from "../components/MainButton";
import Colors from "../constants/Colors";
import { doc, updateDoc, increment, addDoc, collection } from "firebase/firestore";
import { db } from "../firestoreConfig";


// Atomically increment the population of the city by 50.


const AddScoreScreen = () => {
  const [title, setTitle] = useState("");
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoding, setIsLoding] = useState(false);


  const onSubmitHandler = async() => {
    console.log(title,description);
    // setIsLoding(true);
    const score = doc(db, "leaderboard", title);
    const Event = collection(db, title);
    

    await addDoc(Event,{
      eventName : eventName,
      points : description
    })

    await updateDoc(score, {
      points: increment(description)
    });
  setDescription("");
  setTitle("")
  setIsLoding(false);
  }

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
        <TextInput
          mode="outlined"
          label="Team"
          style={styles.input}
          placeholder="Team"
          value={title}
          onChangeText={(title) => setTitle(title)}
        />
        
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
  )
}

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
    backgroundColor: "transparent",
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

export default AddScoreScreen