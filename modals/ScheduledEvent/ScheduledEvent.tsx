import React, { useState } from "react";
import { Modal, Portal, Text, Button, TextInput } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Colors from "../../constants/Colors";
import { View, StyleSheet, ScrollView } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firestoreConfig";
import Emails from "./Emails";

type Props = {
  visible: boolean;
  setVisible: any;
};

const ScheduledEvent: React.FC<Props> = ({ visible, setVisible }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emails, setEmails] = useState([""]);

   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
   const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

   const [date, setDate] = useState("");
   const [time, setTime] = useState("")


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleDateConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    const dt = new Date(date);
    const sdt= dt.toISOString().split("T");
    setDate(sdt[0]);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleTimeConfirm = (time) => {
    console.warn("A time has been picked: ", time);
    const dt= new Date(time);
    const st = dt.toLocaleTimeString();
    setTime(st);
    hideTimePicker();
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleSubmit = () => {
    console.log(title, description);
    addDoc(collection(db, "scheduled-events"), {
      title: title,
      description: description,
      emails: emails,
      date: date,
      time:time,
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
             <Button title="Show Date Picker"  mode="contained" onPress={showDatePicker}>
               Date
              </Button>
             </View>
              
           <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

       <View style={styles.buttonContainer}>
       <Button title="Show Time Picker" mode="contained" onPress={showTimePicker}>
        Time
      </Button>
       </View>
     
           <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />

              <Emails emails={emails} setEmails={setEmails} />
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
