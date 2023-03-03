import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firestoreConfig";
import { useEffect, useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import NewsItem from "../components/EditableNews";

const EditNewsScreen = () => {
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

export default EditNewsScreen;
