import { StyleSheet, View } from "react-native";
import AddCarouselImage from "../components/AddCarouselImage";
import Colors from "../constants/Colors";

const AddCarouselImageScreen = () => {
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
