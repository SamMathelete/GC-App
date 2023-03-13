import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import LiveUpdatesScreen from "./screens/LiveUpdatesScreen";
import RankingScreen from "./screens/RankingScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import { Alert, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LoginFormScreen from "./screens/LoginFormScreen";
import Colors from "./constants/Colors";
import { View, Pressable } from "react-native";
import CalendarScreen from "./screens/CalendarScreen";
import AdminScreen from "./screens/AdminScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AuthContextProvider from "./store/google-auth";
import { useNavigation } from "@react-navigation/native";
import LiveEventCreationScreen from "./screens/LiveEventCreationForm";
import { MD3LightTheme, Provider } from "react-native-paper";
import CricketLiveEditScreen from "./screens/CricketLiveEditScreen";
import FootballLiveEditScreen from "./screens/FootballLiveEditScreen";
import BasketballLiveEditScreen from "./screens/BasketballLiveEditScreen";
import VolleyballLiveEditScreen from "./screens/VolleyballLiveEditScreen";
import TennisLiveEditScreen from "./screens/TennisLiveEditScreen";
import SendNotificationScreen from "./screens/SendNotificationScreen";
import LiveEventEditScreen from "./screens/LiveEventEditScreen";
import AppCredits from "./screens/AppCredits";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useNotifications } from "./hooks/useNotifications";
import AddScoreScreen from "./screens/AddScoreScreen";
import AddCarouselImageScreen from "./screens/AddCarouselImageScreen";
import TeamScoreScreen from "./screens/TeamScoreScreen";
import NewsUpdateScreen from "./screens/NewsUpdateScreen";
import DeleteNewsScreen from "./screens/EditNewsScreen";
import EditCarouselImage from "./screens/EditCarouselImages";
import NotificationScreen from "./screens/NotificationScreen";
import DeleteNotificationsScreen from "./screens/DeleteNotificationsScreen";
import ResultsScreen from "./screens/ResultsScreen";
import EventResultFormScreen from "./screens/EventResultFormScreen";
import DeleteScheduledEvent from "./screens/DeleteScheduledEvent";
import TableTennisLiveEditScreen from "./screens/TableTennisLiveEditScreen";
import BadmintonLiveEditScreen from "./screens/BadmintonLiveEditScreen";
import { LogBox } from "react-native";
import LiveCommentary from "./screens/LiveCommentary";

interface TeamScoreType {
  eventName: string;
  points: string;
}

type RootParamList = {
  HomeScreen: undefined;
  LiveUpdates: undefined;
  LoginScreen: undefined;
  RankingScreen: undefined;
  SendNotificationScreen: undefined;
  ScheduleScreen: undefined;
  LoginFormScreen: undefined;
  Tabbed: undefined;
  AdminHome: undefined;
  CalendarScreen: undefined;
  NotificationScreen: undefined;
  LiveEventCreationScreen: undefined;
  AddScoreScreen: undefined;
  CricketLiveEditScreen: {
    id: string;
  };
  FootballLiveEditScreen: {
    id: string;
  };
  BasketballLiveEditScreen: {
    id: string;
  };
  VolleyballLiveEditScreen: {
    id: string;
  };
  TennisLiveEditScreen: {
    id: string;
  };
  TableTennisLiveEditScreen: {
    id: string;
  };
  BadmintonLiveEditScreen: {
    id: string;
  };
  LiveEventEditScreen: undefined;
  AddCarouselImageScreen: undefined;
  AppCredits: undefined;
  TeamScoreScreen: {
    teamName: string;
    logo: string;
    teamTotalScore: string;
    teamScoreList: TeamScoreType[];
  };
  NewsUpdateScreen: undefined;
  DeleteNewsScreen: undefined;
  EditCarouselImage: undefined;
  NotficationScreen: undefined;
  DeleteNotificationsScreen: undefined;
  ResultsScreen: undefined;
  EventResultFormScreen: undefined;
  DeleteScheduledEvent: undefined;
  LiveCommentary: {
    event: any;
  };
};

const Stack = createNativeStackNavigator<RootParamList>();
const Tabs = createBottomTabNavigator<RootParamList>();

const Tabbed = (): JSX.Element => {
  const navigate = useNavigation<NativeStackNavigationProp<RootParamList>>();

  const notificationNavigate = () => {
    navigate.navigate("NotificationScreen");
  };

  return (
    <Tabs.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.purpleDark,
        },
        headerTintColor: Colors.OffWhite,
        headerTitleAlign: "center",
        headerShadowVisible: false,
        tabBarActiveBackgroundColor: Colors.red,
        tabBarStyle: {
          backgroundColor: Colors.purpleDark,
          height: Platform.OS === "ios" ? 100 : 70,
          borderRadius: 15,
          position: "absolute",
          marginHorizontal: 10,
          marginBottom: 7,
          elevation: 5,
        },
        tabBarLabelStyle: {
          marginBottom: 8,
          fontSize: 12,
        },
        tabBarItemStyle: {
          borderRadius: 15,
          margin: 5,
        },
        tabBarActiveTintColor: Colors.OffWhite,
        tabBarInactiveTintColor: Colors.OffWhite,
      }}
    >
      <Tabs.Screen
        name="LiveUpdates"
        component={LiveUpdatesScreen}
        options={{
          title: "Live",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="radio" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="RankingScreen"
        component={RankingScreen}
        options={{
          title: "Rankings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="podium" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{
          title: "Schedule",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="ResultsScreen"
        component={ResultsScreen}
        options={{
          title: "Results",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default function App() {
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();

  const { registerForPushNotificationsAsync, handleNotificationResponse } =
    useNotifications();
  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    const responseListener =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse
      );
  }, []);

  return (
    <AuthContextProvider>
      <Provider theme={MD3LightTheme}>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AppCredits"
              component={AppCredits}
              options={{
                title: "Credits",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="LoginFormScreen"
              component={LoginFormScreen}
              options={{
                title: "Login",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="AdminHome"
              component={AdminScreen}
              options={{
                title: "Admin Home",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="Tabbed"
              component={Tabbed}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CalendarScreen"
              component={CalendarScreen}
              options={{
                title: "Calendar",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="LiveEventCreationScreen"
              component={LiveEventCreationScreen}
              options={{
                title: "Create Live Event",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="CricketLiveEditScreen"
              component={CricketLiveEditScreen}
              options={{
                title: "Edit Live Event",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="FootballLiveEditScreen"
              component={FootballLiveEditScreen}
              options={{
                title: "Edit Live Event",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="BasketballLiveEditScreen"
              component={BasketballLiveEditScreen}
              options={{
                title: "Edit Live Event",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="VolleyballLiveEditScreen"
              component={VolleyballLiveEditScreen}
              options={{
                title: "Edit Live Event",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="TennisLiveEditScreen"
              component={TennisLiveEditScreen}
              options={{
                title: "Edit Live Event",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="BadmintonLiveEditScreen"
              component={BadmintonLiveEditScreen}
              options={{
                title: "Edit Live Event",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="TableTennisLiveEditScreen"
              component={TableTennisLiveEditScreen}
              options={{
                title: "Edit Live Event",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="SendNotificationScreen"
              component={SendNotificationScreen}
              options={{
                title: "Send Notification",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="LiveEventEditScreen"
              component={LiveEventEditScreen}
              options={{
                title: "Edit Live Event",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="AddScoreScreen"
              component={AddScoreScreen}
              options={{
                title: "Add an event score",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="AddCarouselImageScreen"
              component={AddCarouselImageScreen}
              options={{
                title: "Add Carousel Image",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="TeamScoreScreen"
              component={TeamScoreScreen}
              options={{
                title: "Team Scores",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="NewsUpdateScreen"
              component={NewsUpdateScreen}
              options={{
                title: "News Update",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="DeleteNewsScreen"
              component={DeleteNewsScreen}
              options={{
                title: "Delete News",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="EditCarouselImage"
              component={EditCarouselImage}
              options={{
                title: "Delete Carousel Image",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="NotificationScreen"
              component={NotificationScreen}
              options={{
                title: "Notifications",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="DeleteNotificationsScreen"
              component={DeleteNotificationsScreen}
              options={{
                title: "Delete Notifications",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="EventResultFormScreen"
              component={EventResultFormScreen}
              options={{
                title: "Add Event Result",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="DeleteScheduledEvent"
              component={DeleteScheduledEvent}
              options={{
                title: "Delete Scheduled Event",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
            <Stack.Screen
              name="LiveCommentary"
              component={LiveCommentary}
              options={{
                title: "Live Commentary",
                headerStyle: {
                  backgroundColor: Colors.purpleDark,
                },
                headerTintColor: Colors.OffWhite,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </AuthContextProvider>
  );
}
