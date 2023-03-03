import { useState } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import MainButton from "../components/MainButton";
import Colors from "../constants/Colors";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firestoreConfig";

const NewsUpdateScreen = () => {
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
    };
    await setDoc(doc(db, "news", news.title), news);
    alert("News Published");
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
