import { FC, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import Football from "../components/SportsUpdateCards/EditableFootballCard";
import Colors from "../constants/Colors";
import Cricket from "../components/SportsUpdateCards/EditableCricketCard";
import Basketball from "../components/SportsUpdateCards/EditableBasketballCard";
import Volleyball from "../components/SportsUpdateCards/EditableVolleyballCard";
import MainButton from "../components/MainButton";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { IconButton } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

type RootParamList = {
  LiveUpdates: undefined;
  Cricket: undefined;
  Football: undefined;
  Basketball: undefined;
  Volleyball: undefined;
};

type Props = BottomTabScreenProps<RootParamList, "LiveUpdates">;

const LiveUpdatesScreen: FC<Props> = ({ navigation }) => {
  const [CricketEvents, setCricketEvents] = useState<any>([]);
  const [FootballEvents, setFootballEvents] = useState<any>([]);
  const [BasketballEvents, setBasketballEvents] = useState<any>([]);
  const [VolleyballEvents, setVolleyballEvents] = useState<any>([]);

  const [isLoading, setIsLoading] = useState<any>(false);

  const isFocused = useIsFocused();

  const fetchLiveUpdates = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://gc-app-76138-default-rtdb.firebaseio.com/liveEvents.json"
    );
    const data = await response.json();
    const events = Object.keys(data);
    const cricketEvents = [];
    for (const event of events) {
      if (data[event].type === "Cricket") {
        cricketEvents.push(data[event]);
      }
    }
    setCricketEvents(cricketEvents);

    const footballEvents = [];
    for (const event of events) {
      if (data[event].type === "Football") {
        footballEvents.push(data[event]);
      }
    }
    setFootballEvents(footballEvents);

    const basketballEvents = [];
    for (const event of events) {
      if (data[event].type === "Basketball") {
        basketballEvents.push(data[event]);
      }
    }
    setBasketballEvents(basketballEvents);

    const volleyballEvents = [];
    for (const event of events) {
      if (data[event].type === "Volleyball") {
        volleyballEvents.push(data[event]);
      }
    }
    setVolleyballEvents(volleyballEvents);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchLiveUpdates();
  }, [isFocused]);

  const refreshHandler = () => {
    fetchLiveUpdates();
  };

  navigation.setOptions({
    headerRight: () => (
      <IconButton
        icon="refresh"
        size={30}
        onPress={refreshHandler}
        iconColor="white"
      />
    ),
  });

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
            />
          ))}
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
});

export default LiveUpdatesScreen;