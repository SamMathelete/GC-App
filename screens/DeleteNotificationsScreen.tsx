import { FC, useEffect, useState, useContext } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { doc, getDocs, getDoc, collection, deleteDoc } from "firebase/firestore";
import { db } from "../firestoreConfig";
import NotificationCard from "../components/EditableNotificationCard";
import { useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../store/google-auth";
import Colors from "../constants/Colors";


const allowedEmails = [
  "21ec01021@iitbbs.ac.in",
  "vpresident.sg@iitbbs.ac.in",
  "gsecsnt.sg@iitbbs.ac.in",
  "ugrep.sg@iitbbs.ac.in",
  "gseccul.sg@iitbbs.ac.in",
  "gsecsports.sg@iitbbs.ac.in",
];

const DeleteNotificationsScreen = () => {
  const ctx = useContext(AuthContext);
  const email = ctx?.email;
  const [isAllowed, setIsAllowed] = useState(false);

  const fetchEmailIds = async () => {
    const res = await getDoc(doc(db, "admins", "adminEmails"));
    let data = [];
    data = res.data().email;
    if (data.includes(email)) {
      setIsAllowed(true);
    }
    console.log(data);
  };
  useEffect(() => {
    fetchEmailIds();
    // console.log(allowedEmails);
  }, []);

  if (email === null || !isAllowed) {
    return (
      <View style={styles.container}>
        <Text>You are not authorized to access this page.</Text>
      </View>
    );
  }

  const [notifications, setNotifications] = useState<any>([]);
  const isFocused = useIsFocused();

  const fetchNotifications = async () => {
    const snapshot = await getDocs(collection(db, "notifications"));
    const data = snapshot.docs.map((doc) => doc.data());
    setNotifications(() => data);
  };

  const handleDelete = async (title, description) => {
    Alert.alert(
      "Delete Notification",
      "Are you sure you want to delete this notification?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const docRef = doc(db, "notifications", `${title}_${description}`);
            await deleteDoc(docRef);
            alert("Notification deleted successfully!");
            fetchNotifications();
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchNotifications();
  }, [isFocused]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {notifications.map((notification) => {
        return (
          <NotificationCard
            key={`${notification.title}_${notification.description}`}
            title={notification.title}
            description={notification.description}
            onPress={handleDelete.bind(
              this,
              notification.title,
              notification.description
            )}
          />
        );
      })}
    </View>
  );
};

export default DeleteNotificationsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.OffWhite,
  },
});
