import { FC } from "react";
import { ScrollView } from "react-native";
import Football from "../components/SportsUpdateCards/Football";

const LiveUpdatesScreen: FC = () => {
  return (
    <ScrollView>
      <Football
        matchName="GC Football Finals"
        team1="FCB"
        team2="RM"
        teamLogo1={require("../assets/Images/Group13.png")}
        teamLogo2={require("../assets/Images/Group12.png")}
        score1="3"
        score2="3"
        isPenalty={true}
        penaltyScore1="5"
        penaltyScore2="3"
        time="Full Time"
        venue="SAC Football Ground"
      />
      <Football
        matchName="GC Football Finals"
        team1="FCB"
        team2="RM"
        teamLogo1={require("../assets/Images/Group13.png")}
        teamLogo2={require("../assets/Images/Group12.png")}
        score1="3"
        score2="3"
        isPenalty={true}
        penaltyScore1="5"
        penaltyScore2="3"
        time="Full Time"
        venue="SAC Football Ground"
      />
      <Football
        matchName="GC Football Finals"
        team1="FCB"
        team2="RM"
        teamLogo1={require("../assets/Images/Group13.png")}
        teamLogo2={require("../assets/Images/Group12.png")}
        score1="3"
        score2="3"
        isPenalty={true}
        penaltyScore1="5"
        penaltyScore2="3"
        time="Full Time"
        venue="SAC Football Ground"
      />
    </ScrollView>
  );
};

export default LiveUpdatesScreen;
