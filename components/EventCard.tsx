import { FC, useState } from "react";
import { Text, StyleSheet, View, Pressable, ImageBackground, Linking, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";

interface Props {
  style?: {};
  eventInfo: {
    name: string;
    date?: string;
    time?: string;
    venue?: string;
    link: string;
    description?: string;
  };
}
const EventCard: FC<Props> = ({ style, eventInfo }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = async () => {
        const supported = await Linking.canOpenURL(eventInfo.link);
    
        if (supported) {
          Linking.openURL(eventInfo.link);
        } else {
          console.log("Can't open URL");
        }
      };

    return (
        
        <View style={[styles.rootContainer, style]}>
            <View style={styles.topView}>
                <Text style={styles.eventName}>{eventInfo?.name}</Text>
                    <Pressable 
                    android_ripple={{color: "#FF4D00"}}
                    onPress={() => setIsPressed(!isPressed)}
                    >
                    {!isPressed 
                     ? <AntDesign name="downcircle" size={34} color={Colors.red}/> 
                     : <AntDesign name="upcircle" size={34} color={Colors.red}/>
                    }
                    </Pressable>
            </View>
            {   isPressed &&
                <View>
                    <View style={styles.expanded}>
                        <Text style={styles.description}>{eventInfo?.description}
                        </Text>
                    </View> 
                    <View style={styles.expandedBottom}>
                        <View>
                            <Text style={styles.expandedDate}>{eventInfo?.date}</Text>
                            <Text style={styles.expandedVenue}>{eventInfo?.venue}
                            </Text>
                        </View>
                        <View style={styles.registerButton}>
                            <Pressable onPress={handlePress}>
                                <Text style={styles.register}>Register</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            }
            {!isPressed &&
                <View style={styles.bottomView}>
                    <View style={styles.eventDate}>
                        <Text style={styles.text}>{eventInfo?.date}</Text>
                    </View>
                    <View style={styles.eventVenue}>
                        <Text style={styles.text}>{eventInfo?.venue}</Text>
                    </View>
                </View>
            }
        </View>
    );
}

export default EventCard;

const styles = StyleSheet.create({
    rootContainer: {
        margin: 8,
        borderRadius: 18,
        justifyContent: "space-between",
        backgroundColor: Colors.purpleLight,
        elevation: 10,
        overflow: "hidden",
    },
    cardView: {
        flex: 1,
        justifyContent: "space-between",
    },
    topView: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    expanded: {
        padding: 10,
    },
    expandedBottom: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    bottomView: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        marginTop: 10,
    },
    eventName: {
        color: Colors.OffWhite,
        fontSize: 25,
        fontWeight: "bold",
    },
    eventDate: {
        color: Colors.OffWhite,
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 100,
    },
    eventVenue: {
        color: Colors.OffWhite,
        width: 55,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: Colors.OffWhite,
        fontWeight: "bold",
    },
    description: {
        color: Colors.OffWhite,
    },
    expandText: {
        color: Colors.OffWhite,
        textAlign: "left",
        fontWeight: "bold",
    },
    expandedDate: {
        color: Colors.OffWhite,
        textAlign: "left",
        fontWeight: "bold",
    },
    expandedVenue: {
        color: Colors.OffWhite,
        textAlign: "left",
        fontWeight: "bold",
    },
    registerButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 24,
        backgroundColor: Colors.red,
        elevation: 10,
        shadowColor: "#910101",
    },
    register: {
        fontSize: 24,
        color: Colors.OffWhite,
    }
})