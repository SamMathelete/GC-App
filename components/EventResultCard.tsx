import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
interface Props {
    heading: string;
    result: any;
    textColor?: any;
}

const EventResultCard: FC<Props> = ({ result, heading, textColor }) => {
    return (
        <View style={styles.rootContainer}>
            <Text style={styles.heading}>{heading}</Text>
            <View style={styles.ResultView}>
                <View style={styles.itemView}>
                    <Text style={[styles.position,{ color: textColor}]}>{result[0].rank}</Text>
                    <Text style={[styles.name, {color: textColor}]}>{result[0].name}</Text>
                    <Text style={styles.points}>{result[0].score}</Text>
                </View>

                <View style={styles.itemView}>
                    <Text style={[styles.position,{ color: textColor}]}>{result[1].rank}</Text>
                    <Text style={[styles.name, {color: textColor}]}>{result[1].name}</Text>
                    <Text style={styles.points}>{result[1].score}</Text>
                </View>

                <View style={styles.itemView}>
                    <Text style={[styles.position,{ color: textColor}]}>{result[2].rank}</Text>
                    <Text style={[styles.name, {color: textColor}]}>{result[2].name}</Text>
                    <Text style={styles.points}>{result[2].score}</Text>
                </View>
            </View>
        </View>
    );
}

export default EventResultCard;

const styles = StyleSheet.create({
    rootContainer: {
        borderColor: Colors.red,
        borderWidth: 2,
        padding: 5,
        margin: 10,
        borderRadius: 20,
        paddingHorizontal: 7,
        paddingBottom: 7,
    },
    heading: {
        textAlign: 'center',
        color: Colors.red,
        fontSize: 24,
        fontWeight: 'bold',
    },
    ResultView: {
        borderTopWidth: 2,
        borderColor: Colors.red,
    },
    itemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    position: {
        color: Colors.purpleLight,
        fontSize: 18,
    },
    name: {
        color: Colors.purpleLight,
        fontSize: 18,
        fontWeight: 'bold',
    },
    points: {
        color: Colors.red,
        fontSize: 18,
        fontWeight: 'bold',
    }
});