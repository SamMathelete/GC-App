import { FC, useState } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import MainButton from "./MainButton";
import Colors from "../constants/Colors";
import * as Notifications from "expo-notifications";
import { useNotifications } from "../hooks/useNotifications";
import { db } from "../firestoreConfig";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
const SendNotificationForm: FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { sendPushNotification } = useNotifications();
  const [list, setList] = useState([]);

  const saveNotification = async () => {
    await setDoc(doc(db, "notifications", `${title}_${description}`), {
      title: title,
      description: description,
    });
  };

  const buttonHandler = () => {
    const getTokens = async () => {
      const list1 = [];
      const col = collection(db, "notificationTokens");
      const listSnap = await getDocs(col);
      listSnap.forEach((doc) => {
        if (Object.keys(doc.data()).length !== 0) list1.push(doc.data());
      });
      // console.log(list1)
      setList(() => list1);
    };
    getTokens();
    // console.log(list)
    list.forEach((obj) => {
      sendPushNotification(obj.token, title, description);
      console.log(obj.token);
    });
    saveNotification();
    alert("Notification Sent");
    // sendPushNotification("ExponentPushToken[-cWnFPKPynVSGS_mRDYLnK]",title,description)
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>
        <TextInput
          mode="outlined"
          label="Title"
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={(title) => setTitle(title)}
        />
        <TextInput
          mode="outlined"
          label="Description"
          style={styles.bigInput}
          placeholder="Description"
          multiline={true}
          numberOfLines={10}
          value={description}
          onChangeText={(description) => setDescription(description)}
        />
        <MainButton
          onPress={buttonHandler}
          style={styles.button}
          styleText={styles.buttonText}
        >
          Send Notification
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

export default SendNotificationForm;
