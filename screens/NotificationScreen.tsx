import { FC, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { doc, getDocs, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firestoreConfig";
import NotificationCard from "../components/NotificationCard";
import { useIsFocused } from "@react-navigation/native";

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState<any>([]);
  const isFocused = useIsFocused();

  // const fetchNotifications = async () => {
  //   const snapshot = await getDocs(collection(db, "notifications"));
  //   const data = snapshot.docs.map((doc) => doc.data());
  //   setNotifications(() => data);
  // };

  useEffect(() => {
    // fetchNotifications();
    const unsub = onSnapshot(collection(db, "notifications"), (docsSnap) => {
      const docsList = [];
      docsSnap.forEach((doc) => {
        docsList.push(doc.data());
      });
      setNotifications(docsList);
    });
  }, []);

  if (notifications.length > 0) {
    notifications.sort((a, b) => {
      return a.date.localeCompare(b.date);
    });
  }

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
          />
        );
      })}
    </View>
  );
};

export default NotificationScreen;
