import { View, Text, StyleSheet } from "react-native";
import { doc, getDocs, collection } from "firebase/firestore";
import { db } from "../firestoreConfig";
import EventResultCard from "../components/EventResultCard";
import { useState, useEffect } from "react";

const CulturalResultsScreen = () => {
  const [cultResults, setCultResults] = useState([]);

  const fetchResults = async () => {
    const cr = [];
    const collRef = collection(db, "results");
    const snapshot = await getDocs(collRef);
    snapshot.forEach((doc) => {
      if (doc.data().type === "Cultural") {
        cr.push(doc.data());
      }
    });
    setCultResults(cr);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cultural Results</Text>
      {cultResults.map((result) => (
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
  );
};

export default CulturalResultsScreen;

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
