import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import Calendar from "../components/Calendar";

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

type RootParamList = {
  CalendarScreen: {
    events: Event[];
  };
};

type Props = NativeStackScreenProps<RootParamList, "CalendarScreen">;

const CalendarScreen: FC<Props> = ({ route }) => {
  const { events } = route.params;
  return <Calendar events={events} />;
};

export default CalendarScreen;
