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
import LoginFormScreen from "./screens/LoginFormScreen";
import Colors from "./constants/Colors";

type RootParamList = {
  HomeScreen: undefined;
  LiveUpdates: undefined;
  LoginScreen: undefined;
  RankingScreen: undefined;
  RegisterScreen: undefined;
  ScheduleScreen: undefined;
  LoginFormScreen: undefined;
  Tabbed: undefined;
};

const Stack = createNativeStackNavigator<RootParamList>();
const Tabs = createBottomTabNavigator<RootParamList>();

const Tabbed = (): JSX.Element => {
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
