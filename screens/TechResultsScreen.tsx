import { View, Text, StyleSheet, ScrollView } from "react-native";
import { doc, getDocs, collection } from "firebase/firestore";
import { db } from "../firestoreConfig";
import EventResultCard from "../components/EventResultCard";
import { useState, useEffect } from "react";

const TechResultsScreen = () => {
  const [techResults, setTechResults] = useState([]);

  const fetchResults = async () => {
    const cr = [];
    const collRef = collection(db, "results");
    const snapshot = await getDocs(collRef);
    snapshot.forEach((doc) => {
      if (doc.data().type === "Tech") {
        cr.push(doc.data());
      }
    });
    setTechResults(cr);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Tech Results</Text>
        {techResults.map((result) => (
          <EventResultCard
            key={result.id}
            heading={result.name}
            result={[
              {
                rank: 1,
                name: result.winner,
              },
              {
                rank: 2,
                name: result.runner1,
              },
              {
                rank: 3,
                name: result.runner2,
              },
            ]}
          />
        ))}
      </View>
      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
};

export default TechResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
});
