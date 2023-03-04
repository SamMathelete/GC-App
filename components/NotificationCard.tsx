import { FC } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

interface Props {
  title: string;
  description: string;
}

const NotificationCard: FC<Props> = ({ title, description }) => {
  return (
    <View style={styles.NewsItem}>
      <View style={styles.NewsBody}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  NewsItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: 15,
    backgroundColor: "white",
    elevation: 10,
    margin: 8,
    alignItems: "center",
    height: 100,
    padding: 10,
  },
  NewsBody: {},
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
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  description: {},
  descriptionText: {},
});
