import { FC } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Colors from "../constants/Colors";

interface Props {
    style?: {};
    teamInfo: {
        name: string;
        score: number;
        logo: any;
    }
    index: number;
}
{/** Currently it shows sample image itself for all items. if we take address through a function or something, it gives stack error*/}
const TeamItem: FC<Props> = ({ style, teamInfo, index }) => {
    return (
        <View style={styles.teamItem}>
            <Text style={styles.teamRank}>{index}.</Text>
            <View style={[styles.team, style]}>
                <View style={styles.teamLogoView}>
                    <Image source={teamInfo.logo} style={styles.teamLogo}
                    />
                </View>
                <Text style={styles.teamName}>{teamInfo.name}</Text>
                <View style={styles.scoreView}>
                    <Text style={styles.teamScoreHeading}>Score:</Text>
                    <Text style={styles.teamScore}>{teamInfo.score}</Text>
                </View>
            </View>
        </View>
    )
}

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
        marginVertical: 5,
        marginRight: 10,
        alignItems: "center",
    },
    teamScoreHeading: {
        color: Colors.OffWhite,
        fontSize: 14,
        fontWeight: "bold",
    },
    teamLogoView: {
        width: 55,
        height: 55,
        borderRadius: 28,
        margin: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    teamLogo: {
        width: 55,
        height: 55,
    },
    teamName: {
        fontSize: 30,
        fontWeight: "bold",
        paddingHorizontal: 15,
        alignSelf: "center",
        color: Colors.red,
    },
    teamScore: {
        fontSize: 24,
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
    }
})