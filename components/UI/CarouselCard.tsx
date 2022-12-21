import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = any;

const Card: FC<Props> = ({ item, index }) => {
  return (
    <View style={styles.rootContainer} key={index}>
      <Text>{item.text}</Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  rootContainer: {
    borderRadius: 24,
    backgroundColor: "white",
    padding: 24,
    color: "black",
    width: "90%",
    height: 190,
    elevation: 30,
    marginTop: 10,
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
  },
});
