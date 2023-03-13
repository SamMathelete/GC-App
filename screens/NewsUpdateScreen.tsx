import { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { TextInput } from "react-native-paper";
import MainButton from "../components/MainButton";
import Colors from "../constants/Colors";
import { setDoc, doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../firestoreConfig";
import { AuthContext } from "../store/google-auth";
import { useContext } from "react";
import { useEffect } from "react";

const allowedEmails = [
  "21ec01021@iitbbs.ac.in",
  "vpresident.sg@iitbbs.ac.in",
  "gsecsnt.sg@iitbbs.ac.in",
  "ugrep.sg@iitbbs.ac.in",
  "gseccul.sg@iitbbs.ac.in",
  "gsecsports.sg@iitbbs.ac.in",
];

const NewsUpdateScreen = () => {
  const ctx = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageDriveLink, setImageDriveLink] = useState("");
  const [link, setLink] = useState("");

  const buttonHandler = async () => {
    const imageLink = imageDriveLink.slice(32, 65);
    const news = {
      title: title,
      description: description,
      imageDriveLink: `https://drive.google.com/uc?id=${imageLink}`,
      link: link,
      date: Timestamp.now().toDate().toLocaleDateString(),
    };
    await setDoc(doc(db, "news", news.title), news);
    alert("News Published");
  };

  const email = ctx?.email;
  const [isAllowed, setIsAllowed] = useState(false);

  const fetchEmailIds = async () => {
    const res = await getDoc(doc(db, "admins", "adminEmails"));
    let data = [];
    data = res.data().email;
    if (data.includes(email)) {
      setIsAllowed(true);
    }
  };
  useEffect(() => {
    fetchEmailIds();
    //
  }, []);

  if (email === null || !isAllowed) {
    return (
      <View style={styles.container}>
        <Text>You are not authorized to access this page.</Text>
      </View>
    );
  }

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
          label="Image Drive Link"
          style={styles.input}
          placeholder="Image"
          value={imageDriveLink}
          onChangeText={(text) => setImageDriveLink(text)}
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
        <TextInput
          mode="outlined"
          label="News Link"
          style={styles.input}
          placeholder="Link"
          value={link}
          onChangeText={(text) => setLink(text)}
        />
        <MainButton
          onPress={buttonHandler}
          style={styles.button}
          styleText={styles.buttonText}
        >
          Publish News
        </MainButton>
      </KeyboardAvoidingView>
    </ScrollView>
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

export default NewsUpdateScreen;
