import { FC } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

type Props = any;

const Card: FC<Props> = ({ item, index }) => {
  return (
    <View style={styles.rootContainer} key={index}>
      <View>
      <Image source={require("../../assets/Images/sportsBG.jpg")} style={{height: 200, borderRadius: 50}} resizeMode={'contain'}/>
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
    padding: 24,
    color: "black",
    width: "90%",
    height: 200,
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
