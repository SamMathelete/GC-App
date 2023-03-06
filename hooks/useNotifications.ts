import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Linking, Platform } from "react-native";
import { db } from "../firestoreConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const useNotifications = () => {
  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Token: ", token);
      const notificationCollection = doc(
        db,
        "notificationTokensArray",
        "WJsdZ7yVfxTR4oSJ474T"
      );
      const notificationsList = await getDoc(notificationCollection);
      const notificationsArray = notificationsList.data()?.tokens;
      notificationsArray.push(token);
      await updateDoc(notificationCollection, {
        tokens: notificationsArray,
      });
    } else {
      alert("Must use physical device for Push Notifications");
    }
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  const handleNotification = (notification: Notifications.Notification) => {};

  const handleNotificationResponse = (
    response: Notifications.NotificationResponse
  ) => {
    const data: { url?: string } = response.notification.request.content.data;
    if (data?.url) Linking.openURL(data.url);
  };

  const sendPushNotification = async (
    expoPushToken: any,
    title: any,
    description: any
  ) => {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: title,
      body: description,
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  return {
    registerForPushNotificationsAsync,
    handleNotification,
    handleNotificationResponse,
    sendPushNotification,
  };
};
