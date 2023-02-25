import { FC } from "react";
import { StyleSheet, View } from "react-native";
import BasketballLiveEventEdit from "../components/BasketballLiveEventEdit";
import Colors from "../constants/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  BasketballLiveEditScreen: {
    id: string;
  };
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  "BasketballLiveEditScreen"
>;

const BasketballLiveEditScreen: FC<Props> = ({ route }) => {
  const id = route.params.id;
  const matchData = {
    id: id,
    matchName: "",
    venue: "",
    date: "",
    matchTime: "",
    team1: "",
    team2: "",
    score1: "0",
    score2: "0",
    // isPenalty: "No",
    // penaltyscore1: "",
    // penaltyscore2: "",
  };

  return (
    <View style={styles.rootContainer}>
      <BasketballLiveEventEdit {...matchData} />
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

export default BasketballLiveEditScreen;
