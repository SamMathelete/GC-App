import { FC, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import Football from "../components/SportsUpdateCards/EditableFootballCard";
import Colors from "../constants/Colors";
import Cricket from "../components/SportsUpdateCards/EditableCricketCard";
import Basketball from "../components/SportsUpdateCards/EditableBasketballCard";
import Volleyball from "../components/SportsUpdateCards/EditableVolleyballCard";
import Tennis from "../components/SportsUpdateCards/EditableTennisCard";
import TableTennis from "../components/SportsUpdateCards/EditableTableTennis";
import MainButton from "../components/MainButton";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { IconButton } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import {
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firestoreConfig";
import Badminton from "../components/SportsUpdateCards/EditableBadmintonCard";

type RootParamList = {
  LiveEventEditScreen: undefined;
  Cricket: undefined;
  Football: undefined;
  Basketball: undefined;
  Volleyball: undefined;
  Tennis: undefined;
};

type Props = BottomTabScreenProps<RootParamList, "LiveEventEditScreen">;

const LiveUpdatesScreen: FC<Props> = ({ navigation }) => {
  const [CricketEvents, setCricketEvents] = useState<any>([]);
  const [FootballEvents, setFootballEvents] = useState<any>([]);
  const [BasketballEvents, setBasketballEvents] = useState<any>([]);
  const [VolleyballEvents, setVolleyballEvents] = useState<any>([]);
  const [TennisEvents, setTennisEvents] = useState<any>([]);
  const [TableTennisEvents, setTableTennisEvents] = useState<any>([]);
  const [BadmintonEvents, setBadmintonEvents] = useState<any>([]);

  const [isLoading, setIsLoading] = useState<any>(false);

  const isFocused = useIsFocused();

  // const fetchLiveUpdates = async () => {
  //   setIsLoading(true);
  //   const response = await getDocs(collection(db, "liveEvents"));

  //   // const response = await fetch(
  //   //   "https://gc-app-76138-default-rtdb.firebaseio.com/liveEvents.json"
  //   // );
  //   const data = response.docs.map((doc) => doc.data());
  //   const events = Object.keys(data);
  //   const cricketEvents = [];
  //   for (const event of events) {
  //     if (data[event].type === "Cricket" && data[event].isLive === true) {
  //       cricketEvents.push(data[event]);
  //     }
  //   }
  //   setCricketEvents(cricketEvents);

  //   const footballEvents = [];
  //   for (const event of events) {
  //     if (data[event].type === "Football" && data[event].isLive === true) {
  //       footballEvents.push(data[event]);
  //     }
  //   }
  //   setFootballEvents(footballEvents);

  //   const basketballEvents = [];
  //   for (const event of events) {
  //     if (data[event].type === "Basketball" && data[event].isLive === true) {
  //       basketballEvents.push(data[event]);
  //     }
  //   }
  //   setBasketballEvents(basketballEvents);

  //   const volleyballEvents = [];
  //   for (const event of events) {
  //     if (data[event].type === "Volleyball" && data[event].isLive === true) {
  //       volleyballEvents.push(data[event]);
  //     }
  //   }
  //   setVolleyballEvents(volleyballEvents);

  //   const tennisEvents = [];
  //   for (const event of events) {
  //     if (data[event].type === "Tennis" && data[event].isLive === true) {
  //       tennisEvents.push(data[event]);
  //     }
  //   }
  //   setTennisEvents(tennisEvents);

  //   const tableTennisEvents = [];
  //   for (const event of events) {
  //     if (data[event].type === "TableTennis" && data[event].isLive === true) {
  //       tableTennisEvents.push(data[event]);
  //     }
  //   }
  //   setTableTennisEvents(tableTennisEvents);

  //   const badmintonEvents = [];
  //   for (const event of events) {
  //     if (data[event].type === "Badminton" && data[event].isLive === true) {
  //       badmintonEvents.push(data[event]);
  //     }
  //   }
  //   setBadmintonEvents(badmintonEvents);

  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   fetchLiveUpdates();
  // }, [isFocused]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "liveEvents"), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      const events = Object.keys(data);
      const cricketEvents = [];
      for (const event of events) {
        if (data[event].type === "Cricket" && data[event].isLive === true) {
          cricketEvents.push(data[event]);
        }
      }
      setCricketEvents(cricketEvents);

      const footballEvents = [];
      for (const event of events) {
        if (data[event].type === "Football" && data[event].isLive === true) {
          footballEvents.push(data[event]);
        }
      }
      setFootballEvents(footballEvents);

      const basketballEvents = [];
      for (const event of events) {
        if (data[event].type === "Basketball" && data[event].isLive === true) {
          basketballEvents.push(data[event]);
        }
      }
      setBasketballEvents(basketballEvents);

      const volleyballEvents = [];
      for (const event of events) {
        if (data[event].type === "Volleyball" && data[event].isLive === true) {
          volleyballEvents.push(data[event]);
        }
      }
      setVolleyballEvents(volleyballEvents);

      const tennisEvents = [];
      for (const event of events) {
        if (data[event].type === "Tennis" && data[event].isLive === true) {
          tennisEvents.push(data[event]);
        }
      }
      setTennisEvents(tennisEvents);

      const tableTennisEvents = [];
      for (const event of events) {
        if (data[event].type === "TableTennis" && data[event].isLive === true) {
          tableTennisEvents.push(data[event]);
        }
      }
      setTableTennisEvents(tableTennisEvents);

      const badmintonEvents = [];
      for (const event of events) {
        if (data[event].type === "Badminton" && data[event].isLive === true) {
          badmintonEvents.push(data[event]);
        }
      }
      setBadmintonEvents(badmintonEvents);
    });
  }, []);

  // const refreshHandler = () => {
  //   fetchLiveUpdates();
  // };

  // navigation.setOptions({
  //   headerRight: () => (
  //     <IconButton
  //       icon="refresh"
  //       size={30}
  //       onPress={refreshHandler}
  //       iconColor="white"
  //     />
  //   ),
  // });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: Colors.red,
            paddingVertical: 10,
          }}
        >
          Loading
        </Text>
        <ActivityIndicator size="large" color={Colors.red} />
      </View>
    );
  } else {
    return (
      <View style={styles.rootContainer}>
        <ScrollView>
          <Text style={styles.heading}>Football</Text>
          {FootballEvents.map((event: any) => (
            <Football
              key={event.id}
              matchName={event.matchName}
              team1={{
                teamName: event.team1,
                score: event.score1,
                penaltyScore: event.penaltyscore1,
                logo: event.team1Logo,
              }}
              team2={{
                teamName: event.team2,
                score: event.score2,
                penaltyScore: event.penaltyscore2,
                logo: event.team2Logo,
              }}
              isPenalty={event.isPenalty}
              time={event.matchTime}
              venue={event.venue}
            />
          ))}
          <Text style={styles.heading}>Cricket</Text>
          {CricketEvents.map((event: any) => (
            <Cricket
              key={event.id}
              matchName={event.matchName}
              team1={{
                teamName: event.team1,
                logo: event.team1Logo,
              }}
              team1Score={parseInt(event.score1)}
              team1Wickets={parseInt(event.wickets1)}
              team2={{
                teamName: event.team2,
                logo: event.team2Logo,
              }}
              team2Score={parseInt(event.score2)}
              team2Wickets={parseInt(event.wickets2)}
              venue={event.venue}
              striker={{
                playerName: event.striker,
                runs: parseInt(event.strikerScore),
                balls: parseInt(event.strikerBalls),
              }}
              nonStriker={{
                playerName: event.nonStriker,
                runs: parseInt(event.nonStrikerScore),
                balls: parseInt(event.nonStrikerBalls),
              }}
              bowler={{
                playerName: event.bowler,
                runs: parseInt(event.bowlerRuns),
                wickets: parseInt(event.bowlerWickets),
              }}
              overs={parseFloat(event.overs)}
              battingTeam={event.battingTeam}
            />
          ))}
          <Text style={styles.heading}>Basketball</Text>
          {BasketballEvents.map((event: any) => (
            <Basketball
              key={event.id}
              matchName={event.matchName}
              team1={{
                teamName: event.team1,
                score: event.score1,
                // penaltyScore: event.penaltyscore1,
                logo: event.team1Logo,
              }}
              team2={{
                teamName: event.team2,
                score: event.score2,
                // penaltyScore: event.penaltyscore2,
                logo: event.team2Logo,
              }}
              // isPenalty={event.isPenalty}
              time={event.matchTime}
              venue={event.venue}
            />
          ))}
          <Text style={styles.heading}>Volleyball</Text>
          {VolleyballEvents.map((event: any) => (
            <Volleyball
              key={event.id}
              matchName={event.matchName}
              team1={{
                teamName: event.team1,
                score: event.score1,
                // penaltyScore: event.penaltyscore1,
                logo: event.team1Logo,
              }}
              team2={{
                teamName: event.team2,
                score: event.score2,
                // penaltyScore: event.penaltyscore2,
                logo: event.team2Logo,
              }}
              // isPenalty={event.isPenalty}
              time={event.matchTime}
              venue={event.venue}
            />
          ))}
          <Text style={styles.heading}>Tennis</Text>
          {TennisEvents.map((event: any) => (
            <Tennis
              key={event.id}
              matchName={event.matchName}
              team1={{
                teamName: event.team1,
                score: event.score1,
                setScore: event.setscore1,
                logo: event.team1Logo,
              }}
              team2={{
                teamName: event.team2,
                score: event.score2,
                setScore: event.setscore2,
                logo: event.team2Logo,
              }}
              time={event.matchTime}
              venue={event.venue}
            />
          ))}
          <Text style={styles.heading}>Table Tennis</Text>
          {TableTennisEvents.map((event: any) => (
            <TableTennis
              key={event.id}
              matchName={event.matchName}
              team1={{
                teamName: event.team1,
                score: event.score1,
                setScore: event.setscore1,
                logo: event.team1Logo,
              }}
              team2={{
                teamName: event.team2,
                score: event.score2,
                setScore: event.setscore2,
                logo: event.team2Logo,
              }}
              time={event.matchTime}
              venue={event.venue}
            />
          ))}
          <Text style={styles.heading}>Badminton</Text>
          {BadmintonEvents.map((event: any) => (
            <Badminton
              key={event.id}
              matchName={event.matchName}
              team1={{
                teamName: event.team1,
                score: event.score1,
                setScore: event.setscore1,
                logo: event.team1Logo,
              }}
              team2={{
                teamName: event.team2,
                score: event.score2,
                setScore: event.setscore2,
                logo: event.team2Logo,
              }}
              time={event.matchTime}
              venue={event.venue}
            />
          ))}
          <View
            style={{
              flex: 1,
              height: 100,
            }}
          />
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.OffWhite,
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.purpleDark,
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 10,
  },
});

export default LiveUpdatesScreen;
