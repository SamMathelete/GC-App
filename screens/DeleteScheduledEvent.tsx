import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  getDocs,
  getDoc,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FC, useEffect, useState, useContext } from "react";
import { db } from "../firestoreConfig";
import { AuthContext } from "../store/google-auth";

interface Props {
  name: string;
  refresh: any;
}

const allowedEmails = [
  "21ec01021@iitbbs.ac.in",
  "vpresident.sg@iitbbs.ac.in",
  "gsecsnt.sg@iitbbs.ac.in",
  "ugrep.sg@iitbbs.ac.in",
  "gseccul.sg@iitbbs.ac.in",
  "gsecsports.sg@iitbbs.ac.in",
];

const EventCard: FC<Props> = ({ name, refresh }) => {
  const deleteHandler = (name) => {
    Alert.alert("Delete Event", "Are you sure you want to delete this Event?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          const docRef = doc(db, "scheduled-events", name);
          await deleteDoc(docRef);
          refresh();
          alert("Event deleted successfully!");
        },
      },
    ]);
  };

  return (
    <Pressable onPress={deleteHandler.bind(this, name)} style={styles.card}>
      <Text style={styles.heading}>{name}</Text>
    </Pressable>
  );
};

const DeleteScheduledEvent = () => {
  const ctx = useContext(AuthContext);

  const [events, setEvents] = useState<any>([]);

  const fetchEvents = async () => {
    const snapshot = await getDocs(collection(db, "scheduled-events"));
    const data = snapshot.docs.map((doc) => doc.data());
    setEvents(() => data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {events.map((event) => {
        return (
          <EventCard
            refresh={fetchEvents}
            key={event.title}
            name={event.title}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 360,
    height: 100,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginTop: 10,
  },
});

export default DeleteScheduledEvent;
