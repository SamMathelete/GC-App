import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firestoreConfig";
import { useEffect, useState, useContext } from "react";
import { View, Text, Pressable, Alert, Image, StyleSheet } from "react-native";
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

const EditCarouselImage = () => {
  const ctx = useContext(AuthContext);
  if (!allowedEmails.includes(ctx.email)) {
    return (
      <View style={styles.rootContainer}>
        <Text>You are not authorized to view this page</Text>
      </View>
    );
  }

  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const imagesData = await getDocs(collection(db, "carouselImages"));
    const data = imagesData.docs.map((doc) => doc.data());
    setImages(() => data);
  };

  useEffect(() => {
    fetchImages();
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
          await deleteDoc(doc(db, "carouselImages", id));
          fetchImages();
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
        Carousel Images
      </Text>
      {images.map((item) => {
        return (
          <Pressable
            key={item.imageLink}
            style={{
              height: 150,
              width: "100%",
              margin: 10,
            }}
            onPress={deleteHandler.bind(this, item.imageLink)}
          >
            <Image
              source={{ uri: item.imageDriveLink }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default EditCarouselImage;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.OffWhite,
  },
});
