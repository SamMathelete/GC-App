import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { View, Text, Image } from "react-native";

interface TeamScoreType {
  eventName: string;
  points: string;
}

type RootParamList = {
  TeamScoreScreen: {
    teamName: string;
    logo: string;
    teamTotalScore: string;
    teamScoreList: TeamScoreType[];
  };
};

type Props = NativeStackScreenProps<RootParamList, "TeamScoreScreen">;

const TeamScoreScreen: FC<Props> = ({ route }) => {
  const { teamName, logo, teamTotalScore, teamScoreList } = route.params;
  return (
    <View>
      <View>
        <Image source={{ uri: logo }} />
        <Text>{teamName}</Text>
        <Text>{teamTotalScore}</Text>
      </View>
      <View>
        {teamScoreList.map((teamScore) => (
          <View>
            <Text>{teamScore.eventName}</Text>
            <Text>{teamScore.points}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TeamScoreScreen;
