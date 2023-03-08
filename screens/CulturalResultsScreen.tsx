import { View, Text, StyleSheet, ScrollView } from "react-native";
import { doc, getDocs, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firestoreConfig";
import EventResultCard from "../components/EventResultCard";
import { useState, useEffect } from "react";

const CulturalResultsScreen = () => {
  const [cultResults, setCultResults] = useState([]);

  // const fetchResults = async () => {
  //   const cr = [];
  //   const collRef = collection(db, "results");
  //   const snapshot = await getDocs(collRef);
  //   snapshot.forEach((doc) => {
  //     if (doc.data().type === "Cultural") {
  //       cr.push(doc.data());
  //     }
  //   });
  //   setCultResults(cr);
  // };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "results"), (docsSnap) => {
      const docsList = [];
      docsSnap.forEach((doc) => {
        if (doc.data().type === "Cultural") {
          docsList.push(doc.data());
        }
      });
      setCultResults(docsList);
    });
    // fetchResults();
  }, []);

  return (
    <ScrollView>
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
      <View style={{ height: 100 }}></View>
    </ScrollView>
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
