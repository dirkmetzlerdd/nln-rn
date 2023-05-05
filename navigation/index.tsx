import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/AntDesign";
import * as React from "react";
import { ColorSchemeName, View } from "react-native";
import LinkingConfiguration from "./LinkingConfiguration";
import { RootStackParamList, RootTabParamList } from "../types";
import NewsList from "../screens/newsList";
import NewsDetails from "../screens/newsDetails";
import Profile from "../screens/profile";
import Settings from "../screens/settings";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
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
      <Stack.Screen name="AddService" component={NotFound} />
      <Stack.Screen name="FindService" component={NotFound} />
      <Stack.Screen name="SetActiveService" component={NotFound} />
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
  return (
    <BottomTab.Navigator initialRouteName="News">
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
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Icon name="iconfontdesktop" size={25} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Icon name="appstore-o" size={25} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
