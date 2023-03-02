import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { TextInput, Text, Button, IconButton } from "react-native-paper";
import Colors from "../../constants/Colors";

const SingleEmail = ({ text, removeHandler, changeHandler }) => {
  return (
    <View style={styles.singleEmailContainer}>
      <TextInput
        mode="outlined"
        value={text}
        style={styles.singleEmailText}
        onChangeText={(text) => changeHandler(text)}
      />
      <IconButton
        mode="contained-tonal"
        style={styles.removeEmailButton}
        icon="trash-can-outline"
        onPress={removeHandler}
      />
    </View>
  );
};

const Emails = ({ emails, setEmails }) => {
  const handleAddEmail = () => {
    setEmails(emails.concat(""));
  };

  const handleRemove = (index) => {
    setEmails(emails.filter((data, ind) => ind !== index));
  };

  const handleChange = (index) => {
    return (text) => {
      setEmails(
        emails.map((data, ind) => (ind === index ? text : emails[ind]))
      );
    };
  };

  return (
    <View>
      <Text style={styles.title}>Allowed Emails</Text>
      {emails.map((email, index) => (
        <SingleEmail
          key={index}
          text={email}
          removeHandler={() => handleRemove(index)}
          changeHandler={handleChange(index)}
        />
      ))}
      <Button
        mode="contained-tonal"
        compact
        style={styles.addButton}
        onPress={handleAddEmail}
      >
        Add Email
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: { margin: 5 },
  addButton: { width: 100, margin: 10 },
  singleEmailContainer: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  singleEmailText: { flexGrow: 1, backgroundColor: Colors.OffWhite },
  removeEmailButton: {},
});

export default Emails;
