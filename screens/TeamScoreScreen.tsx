import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { View, Text, Image } from "react-native";

interface TeamScoreType {
  eventName: string;
  points: number;
}

type RootParamList = {
  TeamScoreScreen: {
    teamName: string;
    logo: string;
    teamTotalScore: number;
    teamScoreList: TeamScoreType[];
  };
};

type Props = NativeStackScreenProps<RootParamList, "TeamScoreScreen">;

const TeamScoreScreen: FC<Props> = ({ route }) => {
  
  const { teamName, logo, teamTotalScore, teamScoreList } = route.params;
  console.log(teamTotalScore);
  return (
    <View>
      <View>
        <Image source={{ uri: logo }} style={{width:100, height:100}} />
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
