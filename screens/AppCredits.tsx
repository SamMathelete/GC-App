import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "../constants/Colors";
const AppCredits = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.subHeading}>Developed by</Text>
          <Text style={styles.bigText}>Students' Gymkhana</Text>
          <Text style={styles.bigText}>IIT Bhubaneswar</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.subHeading}>App Development Team</Text>
          <View style={styles.textContainer}>
            <Text style={styles.bigText}>Sambit Mishra</Text>
            <Text style={styles.smallText}>Development Lead</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.bigText}>Ayush Tiwari</Text>
            <Text style={styles.smallText}>Frontend Development Lead</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.bigText}>Indrayudh Ghosh</Text>
            <Text style={styles.smallText}>Fullstack Developer</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.bigText}>Jatin Yadav</Text>
            <Text style={styles.smallText}>Backend Development Lead</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.bigText}>Aniket Roy</Text>
            <Text style={styles.smallText}>Backend Developer</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.bigText}>Lalit Lalchand Mohanani</Text>
            <Text style={styles.smallText}>Backend Developer</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.subHeading}>App Design Team</Text>
          <View style={styles.textContainer}>
            <Text style={styles.bigText}>Chinmay Mathur</Text>
            <Text style={styles.smallText}>Design Lead</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.bigText}>Ayush Tiwari</Text>
            <Text style={styles.smallText}>Frontend Designer</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.bigText}>Sambit Mishra</Text>
            <Text style={styles.smallText}>Frontend Designer</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.subHeading}>Under the Guidance of</Text>
          <Text style={styles.bigText}>Akshat Rampuria</Text>
          <Text style={styles.smallText}>General Secretary</Text>
          <Text style={styles.smallText}>Science and Technology Council</Text>
          <Text style={styles.smallText}>
            Students' Gymkhana, IIT Bhubaneswar
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.subHeading}>Special Thanks to</Text>
          <View style={styles.textContainer}>
            <Text style={styles.bigText}>Jatin Yadav</Text>
            <Text style={styles.smallText}>Neuromancers Secretary</Text>
            <Text style={styles.smallText}>
              Students' Gymkhana, IIT Bhubaneswar
            </Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.bigText}> Shashwat Singh </Text>
            <Text style={styles.smallText}>Web and Design Secretary</Text>
            <Text style={styles.smallText}>
              Students' Gymkhana, IIT Bhubaneswar
            </Text>
          </View>
        </View>
        <View
          style={{
            margin: 30,
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.OffWhite,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  mainHeading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    margin: 10,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    margin: 10,
  },
  bigText: {
    fontSize: 20,
  },
  text: {
    fontSize: 18,
    color: "#000",
    margin: 5,
  },
  smallText: {
    fontSize: 16,
    color: "#000",
  },
});

export default AppCredits;
