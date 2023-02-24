import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { FC, useContext, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ImageBackground,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Card from "../components/UI/CarouselCard";
import Football from "../components/SportsUpdateCards/Football";
import Cricket from "../components/SportsUpdateCards/Cricket";
import { DUMMY_CAROUSEL_DATA } from "../data/carousel_data";
import Colors from "../constants/Colors";

import EventResultCard from "../components/EventResultCard";
import { EventResult } from "../data/EventResult";
import { AuthContext } from "../store/google-auth";
import { IconButton } from "react-native-paper";

type RootParamsList = {
  HomeScreen: undefined;
};

type Props = BottomTabScreenProps<RootParamsList, "HomeScreen">;

const HomeScreen: FC<Props> = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef<any>(null);

  const Dimensions = useWindowDimensions();
  const windowWidth = Dimensions.width;

  const ctx = useContext(AuthContext);

  useEffect(() => {
    console.log(ctx.token);
  }, []);

  const [CricketEvents, setCricketEvents] = useState<any>([]);
  const [FootballEvents, setFootballEvents] = useState<any>([]);

  const fetchLiveUpdates = async () => {
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
  };

  useEffect(() => {
    fetchLiveUpdates();
  }, []);

  const refreshHandler = () => {
    fetchLiveUpdates();
  };

  return (
    <View style={styles.rootContainer}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.carouselContainer}>
          <Carousel
            layout="default"
            data={DUMMY_CAROUSEL_DATA}
            renderItem={Card}
            sliderWidth={windowWidth - 10}
            itemWidth={windowWidth + 10}
            inactiveSlideShift={0}
            useScrollView={true}
            vertical={false}
            ref={isCarousel}
            onSnapToItem={(index) => setIndex(index)}
            contentContainerCustomStyle={{
              marginBottom: 40,
            }}
            autoplay={true}
            enableSnap={true}
          />
          <Pagination
            dotsLength={DUMMY_CAROUSEL_DATA.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: "rgba(0, 0, 0, 0.92)",
              marginVertical: 0,
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
            containerStyle={{ marginTop: -80 }}
          />
        </View>
        <View style={styles.liveContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.titleText}>Live Now</Text>
            <IconButton
              icon="refresh"
              iconColor={Colors.purpleLight}
              size={30}
              onPress={refreshHandler}
            />
          </View>
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
        </View>
        <View style={styles.liveContainer}>
          <Text style={styles.titleText}>Results</Text>
          <EventResultCard
            result={EventResult}
            heading={"RoboWars"}
            textColor={Colors.purpleLight}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: 100,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.OffWhite,
  },
  scrollContainer: {
    flex: 1,
  },
  carouselContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
  liveContainer: {
    flex: 1,
  },
  titleText: {
    color: Colors.purpleDark,
    fontSize: 25,
    marginBottom: 5,
    marginLeft: 15,
    fontWeight: "bold",
  },
});
