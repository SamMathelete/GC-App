import React, { useState } from "react";
import { Modal, Portal, Text, Button, TextInput } from "react-native-paper";
import Colors from "../../constants/Colors";
import { View, StyleSheet, ScrollView } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firestoreConfig";

type Props = {
  visible: boolean;
  setVisible: any;
};

const ScheduledEvent: React.FC<Props> = ({ visible, setVisible }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emails, setEmails] = useState([]);
  const hideModal = () => {
    setVisible(false);
  };

  const handleSubmit = () => {
    console.log(title, description);
    addDoc(collection(db, "scheduled-events"), {
      title: title,
      description: description,
    })
      .then((ref) => console.log("Event Added with id: ", ref.id))
      .then(() => hideModal())
      .catch((err) => {
        console.log("Error adding event: ", err);
      });
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal}>
        <View style={styles.container}>
          <View style={styles.titleBar}>
            <Text style={styles.titleText}>Add Scheduled Event</Text>
          </View>
          <View style={styles.formContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContainer}
            >
              <TextInput
                mode="outlined"
                label="Event Title"
                value={title}
                style={styles.textInput}
                onChangeText={(text) => setTitle(text)}
              />
              <TextInput
                mode="outlined"
                label="Description"
                value={description}
                style={styles.textInput}
                onChangeText={(text) => setDescription(text)}
                multiline
              />
              <View style={styles.buttonContainer}>
                <Button mode="contained" onPress={handleSubmit}>
                  Submit
                </Button>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 20,
    overflow: "hidden",
  },

  titleBar: {
    backgroundColor: Colors.purpleLight,
    height: 100,
    flexDirection: "column-reverse",
  },
  titleText: {
    color: Colors.OffWhite,
    fontSize: 25,
    marginLeft: 15,
    marginBottom: 15,
  },
  formContainer: {
    backgroundColor: Colors.OffWhite,
    height: 300,
  },
  scrollViewContainer: {
    padding: 30,
  },
  textInput: {
    backgroundColor: Colors.OffWhite,
    marginBottom: 20,
  },
  buttonContainer: {
    margin: 10,
  },
});

export default ScheduledEvent;
