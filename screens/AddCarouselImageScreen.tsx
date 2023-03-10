import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import AddCarouselImage from "../components/AddCarouselImage";
import Colors from "../constants/Colors";
import { AuthContext } from "../store/google-auth";
import { useEffect, useState } from "react";
import { db } from "../firestoreConfig";
import { doc, getDoc } from "firebase/firestore";

const allowedEmails = [
  "21ec01021@iitbbs.ac.in",
  "vpresident.sg@iitbbs.ac.in",
  "gsecsnt.sg@iitbbs.ac.in",
  "ugrep.sg@iitbbs.ac.in",
  "gseccul.sg@iitbbs.ac.in",
  "gsecsports.sg@iitbbs.ac.in",
];

const AddCarouselImageScreen = () => {
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
    <View style={styles.rootContainer}>
      <AddCarouselImage />
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

export default AddCarouselImageScreen;
