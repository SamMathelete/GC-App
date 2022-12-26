import { FC } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";

interface Props {
    style?: {};
    teamInfo: {
        name: string;
        score: number;
    }
    index: number;
}

const TeamItem: FC<Props> = ({ style, teamInfo, index }) => {
    return (
        <View style={styles.teamItem}>
            <Text style={styles.teamRank}>{index}.</Text>
            <View style={[styles.team, style]}>
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
        backgroundColor: "#FFB300",
        elevation: 16,
        shadowColor: "#000000",
        margin: 3,
    },
    teamScoreHeading: {
        color: "#F30000",
        fontSize: 14,
        fontWeight: "bold",
    },
    teamName: {
        fontSize: 30,
        fontWeight: "bold",
        paddingHorizontal: 15,
        alignSelf: "center",
        color: "#C10202",
    },
    teamScore: {
        fontSize: 25,
        fontWeight: "bold",
        paddingHorizontal: 17,
        color: "#9D0101",
    },
    teamRank: {
        color: "#FAEE69",
        margin: 7,
        marginLeft: 13,
        fontSize: 25,
        fontWeight: "bold",
    },
    scoreView: {
        alignItems: "center",
    }
})