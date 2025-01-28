import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform, Text, View } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Icons } from "@/constants/Icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const TabIcon = ({ icon, color, name, focused }) => {
    return (
      <View className=' items-center'>
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={color}
          className="w-6 h-6"
        />
        <Text
          className={`${focused ? "font-pbold" : ""} text-sm` }
          style={{ color: color }}
        >
          {name}
        </Text>
      </View>
    );
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color,focused }) =>  <TabIcon
          // icon={Icons.home}
          color={color}
          name="Home"
          focused={focused}
        />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color,focused }) =>  <TabIcon
          // icon={icons.home}
          color={color}
          name="Explore"
          focused={focused}
        />,
        }}
      />
    </Tabs>
  );
}
