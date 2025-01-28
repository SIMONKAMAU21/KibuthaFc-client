import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="signin"
          
        />
        <Stack.Screen
          name="signup"
        />
      </Stack>
      <StatusBar  style="light" />
    </>
  );
};

export default AuthLayout;