import { FC } from "react";
import { StyleSheet, View } from "react-native";
import FootballLiveEventEdit from "../components/FootballLiveEventEdit";
import Colors from "../constants/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  FootballLiveEditScreen: {
    id: string;
  };
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  "FootballLiveEditScreen"
>;

const FootballLiveEditScreen: FC<Props> = ({ route }) => {
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
    isPenalty: "No",
    penaltyscore1: "",
    penaltyscore2: "",
  };

  return (
    <View style={styles.rootContainer}>
      <FootballLiveEventEdit {...matchData} />
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

export default FootballLiveEditScreen;
