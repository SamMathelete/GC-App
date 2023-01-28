import { FC } from "react";
import { StyleSheet, Text, View, Pressable, Linking, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Modal from 'react-native-modal';
import Colors from "../constants/Colors";
import EventResultCard from "./EventResultCard";
interface Props {
    style?: {};
    eventInfo: any;
    onPress: () => void;
    scrollViewRef: any;
    onScroll: any;
}

const EventSubPage: FC<Props> = ({ style, eventInfo, onPress, scrollViewRef, onScroll }) => {

    const handlePress = async () => {
        const supported = await Linking.canOpenURL(eventInfo.link);
    
        if (supported) {
            Linking.openURL(eventInfo.link);
        } else {
            console.log("Can't open URL");
        }
    };

    return(
        <View style={styles.modalView}>
            <Pressable onPress={onPress}>
                    <View style={{borderWidth: 3, borderColor: Colors.red, width: 100, alignSelf: 'center', borderRadius: 10}}></View>
            </Pressable>
            <Text style={styles.EventName}>{eventInfo.name}</Text>
            {eventInfo.isHeld && 
            <EventResultCard heading={'Result'} result={eventInfo.result} textColor={Colors.OffWhite}/>
            } 
            <ScrollView
                ref={scrollViewRef}
                onScroll={onScroll}
                scrollEventThrottle={16} 
                style={styles.ScrollingView}  
            >
                <Text style={styles.Heading}>Description</Text>
                <Text style={styles.description}>{eventInfo?.description}</Text> 
                <Text style={styles.Heading}>Guidelines</Text>
                <Text style={styles.description}>{eventInfo?.description}</Text> 
                <Text style={styles.Heading}>Who can Participate?</Text>
                <Text style={styles.description}>{eventInfo?.description}</Text>
            </ScrollView>
            <View style={styles.Bottom}>
                    <View>
                        <Text style={styles.Date}>{eventInfo?.date}</Text>
                        <Text style={styles.Venue}>{eventInfo?.venue}
                        </Text>
                    </View>
                    <View style={styles.registerButton}>
                        <Pressable onPress={handlePress}>
                            <Text style={styles.register}>Register</Text>
                        </Pressable>
                    </View>
            </View>
        </View>
    );
};

export default EventSubPage;

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: Colors.purpleLight,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingTop: 10,
    },
    EventName: {
        color: Colors.OffWhite,
        fontSize: 35,
        margin: 5,
        textAlign: "center",
        fontWeight: "bold",
    },
    ScrollingView: {
        //borderWidth: 2,
        borderColor: Colors.red,
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 6,
        marginHorizontal: 7,
        backgroundColor: Colors.purpleDark,
    },
    Heading: {
        color: Colors.red,
        fontSize: 22,
        marginLeft: 10
    },
    Bottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        //borderTopWidth: 2, 
        borderColor: Colors.red, 
        marginHorizontal: 10,
        paddingVertical: 10,
    },
    description: {
        color: Colors.OffWhite,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginBottom: 10,
    },
    Date: {
        fontSize: 20,
        color: Colors.red,
        textAlign: "left",
        fontWeight: "bold",
    },
    Venue: {
        fontSize: 20,
        color: Colors.red,
        textAlign: "left",
        fontWeight: "bold",
    },
    registerButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginRight: 10,
        borderRadius: 24,
        backgroundColor: Colors.red,
        elevation: 10,
        shadowColor: "#910101",
    },
    register: {
        fontSize: 24,
        color: Colors.OffWhite,
    },
});