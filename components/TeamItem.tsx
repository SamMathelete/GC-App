import { FC } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Colors from "../constants/Colors";

interface Props {
  style?: {};
  teamInfo: {
    name: string;
    score: number;
    logo: any;
  };
  index: number;
}
{
  /** Currently it shows sample image itself for all items. if we take address through a function or something, it gives stack error*/
}
const TeamItem: FC<Props> = ({ style, teamInfo, index, onClick }) => {
  console.log(teamInfo);
  return (
    <View style={styles.teamItem} onTouchEnd={onClick}>
      <View style={[styles.team, style]}>
        <View style={styles.teamLogoView}>
          <Image
            source={{
              uri: teamInfo.logo,
            }}
            style={styles.teamLogo}
          />
        </View>
        <Text style={styles.teamName}>{teamInfo.branch}</Text>
        <View style={styles.scoreView}>
          {/* <Text style={styles.teamScoreHeading}>Score:</Text> */}
          <Text style={styles.teamScore}>{teamInfo.points}</Text>
        </View>
      </View>
    </View>
  );
};

export default TeamItem;

const styles = StyleSheet.create({
  teamItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  team: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 30,
    backgroundColor: Colors.purpleLight,
    elevation: 10,
    shadowColor: "#000000",
    margin: 4,
    marginVertical: 8,
    marginHorizontal: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.red,
  },
  // teamScoreHeading: {
  //     color: Colors.OffWhite,
  //     fontSize: 14,
  //     fontWeight: "bold",
  // },
  teamLogoView: {
    width: 40,
    height: 40,
    borderRadius: 28,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  teamLogo: {
    width: 62,
    height: 62,
    position: "relative",
    zIndex: 2,
    marginLeft: 10,
    borderColor: Colors.red,
    resizeMode: "contain",
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: Colors.purpleLight,
  },
  teamName: {
    fontSize: 26,
    fontWeight: "600",
    paddingHorizontal: 15,
    alignSelf: "center",
    color: Colors.OffWhite,
  },
  teamScore: {
    fontSize: 26,
    fontWeight: "bold",
    paddingHorizontal: 17,
    color: Colors.red,
  },
  teamRank: {
    color: Colors.red,
    margin: 3,
    marginLeft: 13,
    fontSize: 25,
    fontWeight: "bold",
  },
  scoreView: {
    alignItems: "center",
  },
});
