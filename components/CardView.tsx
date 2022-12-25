import { FC } from "react";
import { Text, StyleSheet, View, Pressable, ImageBackground } from "react-native";

interface Props {
  style?: {};
  eventInfo?: {
    name: string;
    date: string;
    time?: string;
    venue?: string;
  };
}
const CardView: FC<Props> = ({ style, eventInfo }) => {
    
    return (
        
        <View style={[styles.rootContainer, style]}>
                <View>
                    <Text style={styles.eventName}>{eventInfo?.name}</Text>
                </View>
                <View style={styles.bottomView}>
                    <View style={styles.eventDate}>
                        <Text style={styles.text}>{eventInfo?.date}</Text>
                    </View>
                    <View style={styles.eventVenue}>
                        <Text style={styles.text}>{eventInfo?.venue}</Text>
                    </View>
                </View>
        </View>
    );
}

export default CardView;

const styles = StyleSheet.create({
    rootContainer: {
        margin: 5,
        height: 145,
        width: 185,
        borderRadius: 24,
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#FF961D",
        elevation: 10,
    },

    bottomView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    eventName: {
        color: "#AD0000",
        fontSize: 20,
        fontWeight: "bold",
    },
    eventDate: {
        justifyContent: "center",
        alignItems: "center",
    },
    eventVenue: {
        width: 55,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#D60000",
        textAlign: "center",
    }
})