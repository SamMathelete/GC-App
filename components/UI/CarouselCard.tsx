import { FC } from "react";
import { StyleSheet, View, Image } from "react-native";

type Props = any;

const Card: FC<Props> = ({ item, index }) => {
  return (
    <View style={styles.rootContainer} key={index}>
      <View>
        <Image
          style={{
            width: 380,
            borderRadius: 50,
            aspectRatio: 4 / 3,
          }}
          source={{
            uri: item.imageDriveLink,
          }}
          resizeMode={"stretch"}
        />
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: "white",
    color: "black",
    width: 330,
    aspectRatio: 4 / 3,
    elevation: 30,
    marginTop: "5%",
    marginBottom: 40,
    marginLeft: 10,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
