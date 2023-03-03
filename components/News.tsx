import { FC } from "react";
import { Text, View, StyleSheet, Image, Linking } from "react-native";
import Colors from "../constants/Colors";

interface Props {
    thumbnail: any;
    title: string;
    description: string;
    link: any;
}

const NewsItem: FC<Props> = ({ title, description, link, thumbnail }) => {
    const onClick = async () => {
        const supported = await Linking.canOpenURL(link);
        if (supported) {
            Linking.openURL(link);
        } else {
            console.log("Can't open URL");
        }
    };
    return (
        <View style={styles.NewsItem}  onTouchEnd={onClick}>
            <View style={styles.thumbnailView}>
                <Image source={thumbnail} style={styles.thumbnailStyle}/>
            </View>
            <View style={styles.NewsBody}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.description}>
                    {/* <Text style={styles.teamScoreHeading}>Score:</Text> */}
                    <Text style={styles.descriptionText}>{description}</Text>
                </View>
            </View>
        </View>
    )
}

export default NewsItem;

const styles = StyleSheet.create({
    NewsItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "flex-start",
        borderRadius: 15,
        backgroundColor: "white",
        elevation: 10,
        margin: 8,
        alignItems: "center",
    },
    NewsBody: {
        
    },
    thumbnailView: {
        width: 40,
        height: 40,
        margin: 15,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    thumbnailStyle: {
        width: 62,
        height: 62,
        borderRadius: 10
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
    },
    description: {
    },
    descriptionText: {
        
    },
})