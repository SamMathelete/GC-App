import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firestoreConfig";
import { useEffect, useState } from "react";
import { View, Text, Pressable, Alert, Image } from "react-native";

const EditCarouselImage = () => {
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
