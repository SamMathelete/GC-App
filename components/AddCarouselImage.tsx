import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import Colors from "../constants/Colors";
import MainButton from "../components/MainButton";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firestoreConfig";

const AddCarouselImage = () => {
  const [imageDriveLink, setImageDriveLink] = useState("");
  const [imageTitle, setImageTitle] = useState("");

  const addImageHandler = async () => {
    if (imageDriveLink.length === 0 || imageTitle.length === 0) {
      Alert.alert("Please complete all fields");
      return;
    }

    const imageLink = imageDriveLink.slice(32, 65);
    console.log(imageLink);

    const dataPost = {
      imageLink: imageLink,
      imageDriveLink: `https://drive.google.com/uc?id=${imageLink}`,
      imageTitle: imageTitle,
    };

    try {
      const response = await setDoc(
        doc(db, "carouselImages", imageLink),
        dataPost
      );
      // const response = await fetch(
      //   "https://gc-app-76138-default-rtdb.firebaseio.com/carouselImages.json",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(dataPost),
      //   }
      // );
      Alert.alert("Image Added");
      setImageDriveLink("");
      setImageTitle("");
    } catch (err) {
      throw err;
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={styles.rootContainer}>
        <Text style={styles.mainText}>Add Image</Text>
        <TextInput
          style={styles.input}
          label="Image Drive Link"
          value={imageDriveLink}
          onChangeText={(text) => setImageDriveLink(text)}
          mode="outlined"
        />
        <TextInput
          style={styles.input}
          label="Image Title"
          value={imageTitle}
          onChangeText={(text) => setImageTitle(text)}
          mode="outlined"
        />
        <MainButton
          style={styles.mainButton}
          styleText={styles.mainButtonText}
          onPress={addImageHandler}
        >
          Add Image
        </MainButton>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.OffWhite,
    padding: 20,
    borderRadius: 24,
    marginTop: "30%",
  },
  mainButton: {
    width: 225,
    height: 50,
    marginTop: 25,
    marginBottom: 15,
    backgroundColor: Colors.purpleDark,
  },
  sideButton: {
    width: 225,
    height: 50,
    borderColor: Colors.red,
  },
  mainButtonText: {
    color: Colors.red,
  },
  sideButtonText: {
    color: Colors.red,
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
  },
  mainText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    marginTop: 24,
  },
  bottom: {
    marginTop: 5,
    marginBottom: 24,
  },
  bottomText: {
    fontSize: 18,
  },
});

export default AddCarouselImage;
