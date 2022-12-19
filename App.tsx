import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import LiveUpdatesScreen from "./screens/LiveUpdatesScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RankingScreen from "./screens/RankingScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type RootParamList = {
  HomeScreen: undefined;
  LiveUpdates: undefined;
  LoginScreen: undefined;
  RankingScreen: undefined;
  RegisterScreen: undefined;
  ScheduleScreen: undefined;
  Tabbed: undefined;
};

const Stack = createNativeStackNavigator<RootParamList>();
const Tabs = createBottomTabNavigator<RootParamList>();

const Tabbed = (): JSX.Element => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ef8100",
        },
        headerTintColor: "#ffd87d",
        headerTitleAlign: "center",
        headerShadowVisible: false,
        tabBarActiveBackgroundColor: "#f8c616",
        tabBarStyle: {
          backgroundColor: "#ffd87d",
          height: Platform.OS === "ios" ? 100 : 70,
        },
        tabBarLabelStyle: {
          marginBottom: 2,
        },
      }}
    >
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
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: "Register",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create" color={color} size={size} />
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
        }}
      />
    </Tabs.Navigator>
  );
};

export default function App() {
  return (
    <>
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
            name="Tabbed"
            component={Tabbed}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
