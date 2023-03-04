import { FC } from "react";
import { StyleSheet, View } from "react-native";
import TableTennisLiveEventEdit from "../components/TableTennisLiveEventEdit";
import Colors from "../constants/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  TennisLiveEditScreen: {
    id: string;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, "TennisLiveEditScreen">;

const TableTennisLiveEditScreen: FC<Props> = ({ route }) => {
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
    setscore1: "",
    setscore2: "",
  };

  return (
    <View style={styles.rootContainer}>
      <TableTennisLiveEventEdit {...matchData} />
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

export default TableTennisLiveEditScreen;
