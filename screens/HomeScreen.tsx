import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { FC, useContext, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ActivityIndicator,
  Linking,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Card from "../components/UI/CarouselCard";
import Football from "../components/SportsUpdateCards/Football";
import Cricket from "../components/SportsUpdateCards/Cricket";
import Basketball from "../components/SportsUpdateCards/Basketball";
import Volleyball from "../components/SportsUpdateCards/Volleyball";
import Tennis from "../components/SportsUpdateCards/Tennis";
import { DUMMY_CAROUSEL_DATA } from "../data/carousel_data";
import Colors from "../constants/Colors";
import NewsItem from "../components/News";
import EventResultCard from "../components/EventResultCard";
import { EventResult } from "../data/EventResult";
import { IconButton, Menu } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../store/google-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firestoreConfig";
import TableTennis from "../components/SportsUpdateCards/TableTennis";

type RootParamsList = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  NotificationScreen: undefined;
};

type Props = BottomTabScreenProps<RootParamsList, "HomeScreen">;

interface CarouselImages {
  imageDriveLink: string;
  imageTitle: string;
}

const HomeScreen: FC<Props> = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef<any>(null);

  const [isLiveNowLoading, setIsLiveNowLoading] = useState<any>(false);
  const [carouselImages, setCarouselImages] = useState<CarouselImages[] | any>(
    DUMMY_CAROUSEL_DATA
  );

  const Dimensions = useWindowDimensions();
  const windowWidth = Dimensions.width;

  const rulebookUrl =
    "https://drive.google.com/drive/folders/1jmx73cIlFnGLau-jlo7B8k7eQGo0Vx60?usp=sharing";
  const isFocused = useIsFocused();

  const [CricketEvents, setCricketEvents] = useState<any>([]);
  const [FootballEvents, setFootballEvents] = useState<any>([]);
  const [BasketballEvents, setBasketballEvents] = useState<any>([]);
  const [VolleyballEvents, setVolleyballEvents] = useState<any>([]);
  const [TennisEvents, setTennisEvents] = useState<any>([]);
  const [TableTennisEvents, setTableTennisEvents] = useState<any>([]);

  const ctx = useContext(AuthContext);

  const fetchLiveUpdates = async () => {
    setIsLiveNowLoading(true);
    const snapshot = await getDocs(collection(db, "liveEvents"));
    // const response = await fetch(
    //   "https://gc-app-76138-default-rtdb.firebaseio.com/liveEvents.json"
    // );
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

    setIsLiveNowLoading(false);
  };

  useEffect(() => {
    fetchLiveUpdates();
    fetchCarouselData();
    fetchNews();
  }, [isFocused]);

  const refreshHandler = () => {
    fetchLiveUpdates();
  };

  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const openNotification = () => {
    navigation.navigate("NotificationScreen");
  };

  const logout = () => {
    ctx.logout();
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("email");
    navigation.navigate("LoginScreen");
    closeMenu();
  };

  const openRuleBook = () => {
    Linking.openURL(rulebookUrl);
    closeMenu();
  };

  navigation.setOptions({
    headerRight: () => (
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <IconButton
          icon="bell"
          size={30}
          onPress={openNotification}
          iconColor="white"
        />
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <IconButton
              icon="menu"
              size={30}
              onPress={openMenu}
              iconColor="white"
            />
          }
        >
          <Menu.Item onPress={openRuleBook} title="RuleBook" />
          <Menu.Item onPress={logout} title="Log Out" />
        </Menu>
      </View>
    ),
  });

  const fetchCarouselData = async () => {
    const snapshot = await getDocs(collection(db, "carouselImages"));
    // const response = await fetch(
    //   "https://gc-app-76138-default-rtdb.firebaseio.com/carouselImages.json"
    // );
    const data = await snapshot.docs.map((doc) => doc.data());
    const images = Object.keys(data);
    const carouselImages = [];
    for (const image of images) {
      carouselImages.push(data[image]);
    }
    setCarouselImages(carouselImages);
  };

  const [news, setNews] = useState<any>([]);

  const fetchNews = async () => {
    const snapshot = await getDocs(collection(db, "news"));
    const data = await snapshot.docs.map((doc) => doc.data());
    const news = Object.keys(data);
    const newsData = [];
    for (const n of news) {
      newsData.push(data[n]);
    }
    setNews(newsData);
  };

  return (
    <View style={styles.rootContainer}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.carouselContainer}>
          <Carousel
            layout="default"
            data={carouselImages}
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
              height: 330,
              alignItems: "center",
            }}
            autoplay={true}
            enableSnap={true}
          />
          <Pagination
            dotsLength={carouselImages.length}
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
        <View>
          <Text style={styles.titleText}>News</Text>
          {news.map((n: any) => {
            return (
              <NewsItem
                key={n.title}
                title={n.title}
                description={n.description}
                thumbnail={n.imageDriveLink}
                link={n.link}
              />
            );
          })}
        </View>
        <View style={styles.liveContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.titleText}>Live Now</Text>
              <MaterialCommunityIcons
                name="record-circle-outline"
                size={30}
                color={Colors.red}
              />
            </View>
            <IconButton
              icon="refresh"
              iconColor={Colors.purpleLight}
              size={30}
              onPress={refreshHandler}
            />
          </View>
          {isLiveNowLoading && (
            <ActivityIndicator size="large" color={Colors.red} />
          )}
          {!isLiveNowLoading && (
            <View>
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
            </View>
          )}
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
    marginRight: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.purpleDark,
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.purpleDark,
    marginHorizontal: 20,
  },
});
