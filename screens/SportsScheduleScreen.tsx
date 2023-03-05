import { FC, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import EventCard from "../components/EventCard";
import Colors from "../constants/Colors";

interface Props {
  events: any;
}

const SportsScheduleScreen: FC<Props> = ({ events }) => {
  const [FootballEvents, setFootballEvents] = useState([]);
  const [CricketEvents, setCricketEvents] = useState([]);
  const [BasketballEvents, setBasketballEvents] = useState([]);
  const [TennisEvents, setTennisEvents] = useState([]);
  const [BadmintonEvents, setBadmintonEvents] = useState([]);
  const [VolleyballEvents, setVolleyballEvents] = useState([]);
  const [TableTennisEvents, setTableTennisEvents] = useState([]);
  const [ChessEvents, setChessEvents] = useState([]);
  const [AthleticsEvents, setAthleticsEvents] = useState([]);
  const [GymEvents, setGymEvents] = useState([]);
  const [OtherEvents, setOtherEvents] = useState([]);

  const fetchData = () => {
    const ftbl = [];
    const crkt = [];
    const bskt = [];
    const tns = [];
    const bdmnt = [];
    const vlybl = [];
    const tbltns = [];
    const chss = [];
    const athlts = [];
    const gym = [];
    const otherEvents = [];
    events.forEach((event) => {
      if (event.category === "Football") {
        ftbl.push(event);
      } else if (event.category === "Cricket") {
        crkt.push(event);
      } else if (event.category === "Basketball") {
        bskt.push(event);
      } else if (event.category === "Tennis") {
        tns.push(event);
      } else if (event.category === "Badminton") {
        bdmnt.push(event);
      } else if (event.category === "Volleyball") {
        vlybl.push(event);
      } else if (event.category === "Table Tennis") {
        tbltns.push(event);
      } else if (event.category === "Chess") {
        chss.push(event);
      } else if (event.category === "Athletics") {
        athlts.push(event);
      } else if (event.category === "Gym") {
        gym.push(event);
      } else if (event.type === "Sports") {
        otherEvents.push(event);
      }
    });
    setFootballEvents(ftbl);
    setCricketEvents(crkt);
    setBasketballEvents(bskt);
    setTennisEvents(tns);
    setBadmintonEvents(bdmnt);
    setVolleyballEvents(vlybl);
    setTableTennisEvents(tbltns);
    setChessEvents(chss);
    setAthleticsEvents(athlts);
    setGymEvents(gym);
    setOtherEvents(otherEvents);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.rootContainer}>
      <ScrollView>
        <Text style={styles.heading}>Football</Text>
        {FootballEvents.map((event: any) => (
          <EventCard key={event.title} eventInfo={event} />
        ))}
        <Text style={styles.heading}>Cricket</Text>
        {CricketEvents.map((event: any) => (
          <EventCard key={event.title} eventInfo={event} />
        ))}
        <Text style={styles.heading}>Basketball</Text>
        {BasketballEvents.map((event: any) => (
          <EventCard key={event.title} eventInfo={event} />
        ))}
        <Text style={styles.heading}>Volleyball</Text>
        {VolleyballEvents.map((event: any) => (
          <EventCard key={event.title} eventInfo={event} />
        ))}
        <Text style={styles.heading}>Tennis</Text>
        {TennisEvents.map((event: any) => (
          <EventCard key={event.title} eventInfo={event} />
        ))}
        <Text style={styles.heading}>Table Tennis</Text>
        {TableTennisEvents.map((event: any) => (
          <EventCard key={event.title} eventInfo={event} />
        ))}
        <Text style={styles.heading}>Badminton</Text>
        {BadmintonEvents.map((event: any) => (
          <EventCard key={event.title} eventInfo={event} />
        ))}
        <Text style={styles.heading}>Gym</Text>
        {GymEvents.map((event: any) => (
          <EventCard key={event.title} eventInfo={event} />
        ))}
        <Text style={styles.heading}>Chess</Text>
        {ChessEvents.map((event: any) => (
          <EventCard key={event.title} eventInfo={event} />
        ))}
        <Text style={styles.heading}>Athletics</Text>
        {AthleticsEvents.map((event: any) => (
          <EventCard key={event.title} eventInfo={event} />
        ))}
        <Text style={styles.heading}>Other</Text>
        {OtherEvents.map((event: any) => (
          <EventCard key={event.title} eventInfo={event} />
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.purpleDark,
    marginHorizontal: 20,
  },
});

export default SportsScheduleScreen;
