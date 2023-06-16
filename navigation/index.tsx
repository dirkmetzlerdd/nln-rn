import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/AntDesign";
import * as React from "react";
import { View } from "react-native";
import LinkingConfiguration from "./LinkingConfiguration";
import { RootStackParamList, RootTabParamList } from "../types";
import NewsList from "../screens/newsList";
import NewsDetails from "../screens/newsDetails";
import Profile from "../screens/account";
import Services from "../screens/services";
import { useColorScheme } from "react-native";
import Account from "../screens/account";
import AddService from "../screens/addService";
import ServiceDetails from "../screens/serviceDetails";
import { Text } from "react-native-paper";
import AddNews from "../screens/addNews";

const vintageYellow = "#feda6a";
const silverFox = "#d4d4dc";
const matteGrey = "#393f4d";
const darkSlate = "#1d1e22";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#be3144",
    text: "#303841",
    textSecondary: "#d3d6db",
    background: "#d3d6db",
    cardBackground: "#3a4750",
  },
};

const MyThemeDark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: vintageYellow,
    text: silverFox,
    textSecondary: matteGrey,
    background: matteGrey,
    cardBackground: darkSlate,
  },
};

export default function Navigation() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={scheme === "dark" ? MyThemeDark : MyTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

function NotFound() {
  return <View style={{ flex: 1 }}>NotFound</View>;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewsDetails"
        component={NewsDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServiceDetails"
        component={ServiceDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddService"
        component={AddService}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddNews"
        component={AddNews}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="FindService" component={NotFound} />
      <Stack.Screen name="SetActiveService" component={NotFound} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen
        name="NotFound"
        component={NotFound}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={NotFound} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <BottomTab.Navigator
        initialRouteName="News"
        screenOptions={{
          tabBarItemStyle: {},
          tabBarStyle: {
            paddingTop: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarActiveTintColor: colors.text,
          tabBarLabelStyle: {},
          tabBarShowLabel: true,
        }}
      >
        <BottomTab.Screen
          name="News"
          component={NewsList}
          options={{
            headerShown: false,
            title: "News",
            tabBarIcon: ({ color }) => (
              <Icon name="layout" size={25} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Services"
          component={Services}
          options={{
            title: "Services",
            tabBarIcon: ({ color }) => (
              <Icon name="appstore-o" size={25} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Icon name="user" size={25} color={color} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </View>
  );
}
