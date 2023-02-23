import Calendar from "../components/Calendar";

const CalendarScreen = () => {
  return (
    <Calendar
      events={[
        {
          id: "1",
          name: "Event 1",
          date: new Date("2023-03-20"),
          link: "https://www.google.com",
        },
        {
          id: "2",
          name: "Event 2",
          date: new Date("2023-03-20"),
          link: "https://www.google.com",
        },
        {
          id: "3",
          name: "Event 3",
          date: new Date("2023-03-25"),
          link: "https://www.google.com",
        },
      ]}
    />
  );
};

export default CalendarScreen;
