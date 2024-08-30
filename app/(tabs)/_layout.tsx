import { Tabs, useGlobalSearchParams } from "expo-router";
import React from "react";

import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#A2CCA4",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#7D3106",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: "hidden",
          position: "absolute",
        },
        tabBarLabel: () => false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={40}
              color={focused ? "#A2CCA4" : "#FABA66"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sleep"
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="bed"
              size={30}
              color={focused ? "#A2CCA4" : "#FABA66"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="game-controller"
              size={40}
              color={focused ? "#A2CCA4" : "#FABA66"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="comer"
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="cutlery"
              size={30}
              color={focused ? "#A2CCA4" : "#FABA66"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
