import React, { useState } from "react";
import {
  Modal,
  Portal,
  Text,
  Button,
  TextInput,
  Menu,
} from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Colors from "../../constants/Colors";
import { View, StyleSheet, ScrollView } from "react-native";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firestoreConfig";
import Emails from "./Emails";

type Props = {
  visible: boolean;
  setVisible: any;
};

const ScheduledEvent: React.FC<Props> = ({ visible, setVisible }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [guidelines, setGuidelines] = useState("");
  const [emails, setEmails] = useState([""]);
  const [venue, setVenue] = useState("");
  const [stream, setStream] = useState("");
  const [sportsStreams, setSportsStreams] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [registerLink, setRegisterLink] = useState("");

  const [streamModalVisible, setStreamModalVisible] = useState(false);
  const [sportsModalVisible, setSportsModalVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleDateConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    const dt = new Date(date);
    const sdt = dt.toISOString().split("T");
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
    const dt = new Date(time);
    const st = dt.toLocaleTimeString();
    setTime(st);
    hideTimePicker();
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleSubmit = async () => {
    let valid =
      title.length > 0 &&
      description.length > 0 &&
      emails.length > 0 &&
      date.length > 0 &&
      time.length > 0 &&
      venue.length > 0 &&
      registerLink.length > 0 &&
      stream.length > 0;

    if (stream === "Sports") {
      valid = valid && sportsStreams.length > 0;
    }

    if (!valid) {
      alert("Please fill all the fields");
      return;
    }

    console.log(title, description);
    try {
      await setDoc(doc(db, "scheduled-events", title), {
        title: title,
        description: description,
        guidelines: guidelines,
        emails: emails,
        date: date,
        time: time,
        venue: venue,
        isHeld: false,
        stream: stream,
        category: sportsStreams,
        link: registerLink,
      });
      // .then((ref) => console.log("Event Added with id: ", ref.id))
      // .then(() => {
      //   hideModal();
      //   alert("Event Added Successfully");
      // })
      // .catch((err) => {
      //   console.log("Error adding event: ", err);
      // });
      alert("Event Added Successfully");
      hideModal();
    } catch (err) {
      console.log("Error adding event: ", err);
    }
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
              <TextInput
                mode="outlined"
                label="Guidelines"
                value={guidelines}
                style={styles.textInput}
                onChangeText={(text) => setGuidelines(text)}
                multiline
              />
              <TextInput
                mode="outlined"
                label="Venue"
                value={venue}
                style={styles.textInput}
                onChangeText={(text) => setVenue(text)}
              />
              <Menu
                visible={streamModalVisible}
                anchor={
                  <TextInput
                    value={stream}
                    onPressIn={() => setStreamModalVisible(true)}
                    showSoftInputOnFocus={false}
                    mode="outlined"
                    style={styles.textInput}
                    label="Stream"
                  />
                }
                onDismiss={() => setStreamModalVisible(false)}
              >
                <Menu.Item
                  title="Tech"
                  onPress={() => {
                    setStream("Tech");
                    setStreamModalVisible(false);
                  }}
                />
                <Menu.Item
                  title="Cultural"
                  onPress={() => {
                    setStream("Cultural");
                    setStreamModalVisible(false);
                  }}
                />
                <Menu.Item
                  title="Sports"
                  onPress={() => {
                    setStream("Sports");
                    setStreamModalVisible(false);
                  }}
                />
              </Menu>
              {stream === "Sports" && (
                <Menu
                  visible={sportsModalVisible}
                  anchor={
                    <TextInput
                      value={sportsStreams}
                      onPressIn={() => setSportsModalVisible(true)}
                      showSoftInputOnFocus={false}
                      mode="outlined"
                      style={styles.textInput}
                      label="Sports Category"
                    />
                  }
                  onDismiss={() => setSportsModalVisible(false)}
                >
                  <Menu.Item
                    title="Football"
                    onPress={() => {
                      setSportsStreams("Football");
                      setSportsModalVisible(false);
                    }}
                  />
                  <Menu.Item
                    title="Cricket"
                    onPress={() => {
                      setSportsStreams("Cricket");
                      setSportsModalVisible(false);
                    }}
                  />
                  <Menu.Item
                    title="Basketball"
                    onPress={() => {
                      setSportsStreams("Basketball");
                      setSportsModalVisible(false);
                    }}
                  />
                  <Menu.Item
                    title="Volleyball"
                    onPress={() => {
                      setSportsStreams("Volleyball");
                      setSportsModalVisible(false);
                    }}
                  />
                  <Menu.Item
                    title="Table Tennis"
                    onPress={() => {
                      setSportsStreams("Table Tennis");
                      setSportsModalVisible(false);
                    }}
                  />
                  <Menu.Item
                    title="Badminton"
                    onPress={() => {
                      setSportsStreams("Badminton");
                      setSportsModalVisible(false);
                    }}
                  />
                  <Menu.Item
                    title="Chess"
                    onPress={() => {
                      setSportsStreams("Chess");
                      setSportsModalVisible(false);
                    }}
                  />
                  <Menu.Item
                    title="Atheletics"
                    onPress={() => {
                      setSportsStreams("Atheletics");
                      setSportsModalVisible(false);
                    }}
                  />
                  <Menu.Item
                    title="Gym"
                    onPress={() => {
                      setSportsStreams("Gym");
                      setSportsModalVisible(false);
                    }}
                  />
                  <Menu.Item
                    title="Tennis"
                    onPress={() => {
                      setSportsStreams("Tennis");
                      setSportsModalVisible(false);
                    }}
                  />
                  <Menu.Item
                    title="Other"
                    onPress={() => {
                      setSportsStreams("Other");
                      setSportsModalVisible(false);
                    }}
                  />
                </Menu>
              )}
              <TextInput
                mode="outlined"
                label="Register Link"
                value={registerLink}
                style={styles.textInput}
                onChangeText={(text) => setRegisterLink(text)}
              />
              <View style={styles.buttonContainer}>
                <Button
                  title="Show Date Picker"
                  mode="contained"
                  onPress={showDatePicker}
                >
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
                <Button
                  title="Show Time Picker"
                  mode="contained"
                  onPress={showTimePicker}
                >
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
    color: "black",
  },
  buttonContainer: {
    margin: 10,
  },
});

export default ScheduledEvent;
