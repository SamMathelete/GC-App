import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

interface Event {
  date: string;
  description: string;
  emails: string[];
  time: string;
  guidelines: string;
  isHeld: boolean;
  link?: string;
  stream: string;
  title: string;
  venue: string;
}

interface CalendarProps {
  events: Event[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDatePress = (date: Date) => {
    setSelectedDate(date);
  };

  const isDateHighlighted = (date: Date) => {
    return events.some((event) => isSameDay(new Date(event.date), date));
  };

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(new Date(event.date), date));
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const renderCalendar = () => {
    const today = new Date("2023-03-01");
    const daysInMonth = new Date(today.getFullYear(), 3, 0).getDate() + 8;
    const firstDayOfMonth = new Date(today.getFullYear(), 3, 1).getDay();

    const calendar: JSX.Element[] = [];

    let day = 1;
    for (let i = 0; i < 7; i++) {
      const week: JSX.Element[] = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          week.push(<View key={`${i}-${j}`} style={styles.dayCell} />);
        } else if (day > daysInMonth) {
          week.push(<View key={`${i}-${j}`} style={styles.dayCell} />);
        } else {
          const date = new Date(today.getFullYear(), today.getMonth(), day);
          week.push(
            <TouchableOpacity
              key={`${i}-${j}`}
              style={[
                styles.dayCell,
                isDateHighlighted(date) && styles.highlightedDayCell,
              ]}
              onPress={() => handleDatePress(date)}
            >
              <Text style={styles.dayText}>
                {day % 31 == 0 ? 31 : day % 31}
              </Text>
            </TouchableOpacity>
          );
          day++;
        }
      }
      calendar.push(
        <View key={i} style={styles.weekRow}>
          {week}
        </View>
      );
    }

    return calendar;
  };

  const renderEventsForDate = () => {
    if (!selectedDate) {
      return null;
    }

    const eventsForDate = getEventsForDate(selectedDate);

    if (eventsForDate.length === 0) {
      return (
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          No events for {selectedDate.toDateString()}
        </Text>
      );
    }

    return (
      <View style={styles.eventsContainer}>
        {/* <ScrollView> */}
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Events for {selectedDate.toDateString()}
        </Text>
        <ScrollView>
          {eventsForDate.map((event) => (
            <TouchableOpacity key={event.title}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 10,
                  color: "white",
                }}
              >
                {event.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* </ScrollView> */}
        <View
          style={{
            height: 100,
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Events Calendar</Text>
      <View style={styles.calendar}>{renderCalendar()}</View>
      <View style={styles.events}>{renderEventsForDate()}</View>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#111358",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  heading: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  calendar: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
  },
  dayCell: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    color: "white",
  },
  highlightedDayCell: {
    backgroundColor: "blue",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  events: {
    marginTop: 20,
  },
  noEventsText: {
    color: "white",
  },
  eventLinkText: {
    color: "white",
    textDecorationLine: "underline",
  },
  eventsContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 400,
  },
});
