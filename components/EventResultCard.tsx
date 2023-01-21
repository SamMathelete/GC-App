import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
interface Props {
    result: any;
}

const EventResultCard: FC<Props> = ({ result }) => {
    return (
        <View style={styles.rootContainer}>
            <Text style={styles.heading}>Result</Text>
            <View style={styles.ResultView}>
                <View style={styles.itemView}>
                    <Text style={styles.position}>{result[0].rank}</Text>
                    <Text style={styles.name}>{result[0].name}</Text>
                    <Text style={styles.points}>{result[0].score}</Text>
                </View>

                <View style={styles.itemView}>
                    <Text style={styles.position}>{result[1].rank}</Text>
                    <Text style={styles.name}>{result[1].name}</Text>
                    <Text style={styles.points}>{result[1].score}</Text>
                </View>

                <View style={styles.itemView}>
                    <Text style={styles.position}>{result[2].rank}</Text>
                    <Text style={styles.name}>{result[2].name}</Text>
                    <Text style={styles.points}>{result[2].score}</Text>
                </View>
            </View>
        </View>
    );
}

export default EventResultCard;

const styles = StyleSheet.create({
    rootContainer: {
        backgroundColor: Colors.red,
        padding: 5,
        margin: 10,
        elevation: 10,
        borderRadius: 20,
        paddingHorizontal: 7,
        paddingBottom: 7,
    },
    heading: {
        textAlign: 'center',
        color: Colors.OffWhite,
        fontSize: 24,
        fontWeight: 'bold',
    },
    ResultView: {
        borderTopWidth: 2,
        borderColor: Colors.OffWhite,
        backgroundColor: Colors.red,
    },
    itemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    position: {
        color: Colors.OffWhite,
        fontSize: 18,
    },
    name: {
        color: Colors.OffWhite,
        fontSize: 18,
        fontWeight: 'bold',
    },
    points: {
        color: '#FEC364',
        fontSize: 18,
        fontWeight: 'bold',
    }
});