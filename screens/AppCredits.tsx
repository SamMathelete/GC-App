import { View, Text, StyleSheet, ScrollView } from "react-native";

const AppCredits = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.mainHeading}>App Credits</Text>
        <View style={styles.textContainer}>
          <Text style={styles.subHeading}>Developed by</Text>
          <Text style={styles.bigText}>
            Students' Gymkhana, IIT Bhubaneswar
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.subHeading}>App Development Team</Text>
          <Text style={styles.text}>Sambit Mishra, Development Lead</Text>
          <Text style={styles.text}>
            Ayush Tiwari, Frontend Development Lead
          </Text>
          <Text style={styles.text}>Indrayudh Ghosh, Fullstack Developer</Text>
          <Text style={styles.text}>Jatin Yadav, Backend Development Lead</Text>
          <Text style={styles.text}>Aniket Roy, Backend Developer</Text>
          <Text style={styles.text}>
            Lalit Lalchand Mohanani, Backend Developer
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.subHeading}>App Design Team</Text>
          <Text style={styles.text}>Chinmay Mathur, Design Lead</Text>
          <Text style={styles.text}>Ayush Tiwari, Frontend Designer</Text>
          <Text style={styles.text}>Sambit Mishra, Frontend Designer</Text>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    backgroundColor: "#fff",
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
