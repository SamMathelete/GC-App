import {
  getDocs,
  getDoc,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firestoreConfig";
import { useEffect, useState, useContext } from "react";
import { View, Text, Pressable, Alert, StyleSheet } from "react-native";
import NewsItem from "../components/EditableNews";
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

const EditNewsScreen = () => {
  const ctx = useContext(AuthContext);

  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    const newsData = await getDocs(collection(db, "news"));
    const data = newsData.docs.map((doc) => doc.data());
    setNews(() => data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const deleteHandler = async (id) => {
    Alert.alert("Delete", "Are you sure you want to delete this news?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          await deleteDoc(doc(db, "news", id));
          fetchNews();
        },
      },
    ]);
  };

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
  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          margin: 10,
        }}
      >
        News
      </Text>
      {news.map((item) => {
        return (
          <Pressable
            key={item.title}
            style={{
              height: 150,
              width: "100%",
            }}
            onPress={deleteHandler.bind(this, item.title)}
          >
            <NewsItem
              title={item.title}
              description={item.description}
              link={item.link}
              thumbnail={item.imageDriveLink}
            />
          </Pressable>
        );
      })}
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

export default EditNewsScreen;
