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
import { Provider } from "react-native-paper";
import CricketLiveEditScreen from "./screens/CricketLiveEditScreen";
import FootballLiveEditScreen from "./screens/FootballLiveEditScreen";
import BasketballLiveEditScreen from "./screens/BasketballLiveEditScreen";
import VolleyballLiveEditScreen from "./screens/VolleyballLiveEditScreen";
import SendNotificationScreen from "./screens/SendNotificationScreen";
import LiveEventEditScreen from "./screens/LiveEventEditScreen";
import AppCredits from "./screens/AppCredits";

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
  LiveEventCreationScreen: undefined;
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
  LiveEventEditScreen: undefined;
  AppCredits: undefined;
};

const Stack = createNativeStackNavigator<RootParamList>();
const Tabs = createBottomTabNavigator<RootParamList>();

const Tabbed = (): JSX.Element => {
  const navigate = useNavigation<NativeStackNavigationProp<RootParamList>>();

  const calendarNavigate = () => {
    navigate.navigate("CalendarScreen");
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
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{
          title: "Schedule",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
          headerRight() {
            return (
              <View style={{ paddingRight: 20 }}>
                <Pressable onPress={calendarNavigate}>
                  <Ionicons name="calendar" color={Colors.red} size={35} />
                </Pressable>
              </View>
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

export default function App() {
  return (
    <AuthContextProvider>
      <Provider>
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
                title: "App Credits",
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
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </AuthContextProvider>
  );
}
