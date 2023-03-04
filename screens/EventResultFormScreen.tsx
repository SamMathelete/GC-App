import { FC, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import EventResultForm from "../components/EventResultForm";
import Colors from "../constants/Colors";
import { AuthContext } from "../store/google-auth";

const allowedEmails = [
  "21ec01021@iitbbs.ac.in",
  "vpresident.sg@iitbbs.ac.in",
  "gsecsnt.sg@iitbbs.ac.in",
  "ugrep.sg@iitbbs.ac.in",
  "gseccul.sg@iitbbs.ac.in",
  "gsecsports.sg@iitbbs.ac.in",
];

const EventResultFormScreen: FC = () => {
  const ctx = useContext(AuthContext);
  if (!allowedEmails.includes(ctx.email)) {
    return (
      <View style={styles.rootContainer}>
        <Text>You are not authorized to view this page</Text>
      </View>
    );
  }
  return (
    <View style={styles.rootContainer}>
      <EventResultForm />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.OffWhite,
  },
});

export default EventResultFormScreen;
