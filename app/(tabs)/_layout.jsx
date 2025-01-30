import { Tabs, usePathname } from 'expo-router';
import React from 'react';
import { Image, Platform, Text, View } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import home from '../../assets/icons/home.png'; // Replace with your correct icon
import news from '../../assets/icons/news.png'; // Replace with your correct icon

const TabIcon = ({ icon, color, name, focused }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center',display: 'flex',marginTop:5 }}>
    <Image
      source={icon}
      resizeMode="scaleAspectFit"
      tintColor={color}
      style={{ width: 25, height: 25 }}
    />
    <Text style={{ color, fontWeight: `${focused ? "800" : "500"}`, fontSize: 10 }}>{name}</Text>
  </View>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

const hiddenPathnames = [
  '/userDetails'
]
const hiddenRoutes = (pathname,hiddenPathnames) =>{
  return hiddenPathnames.includes(pathname)
}
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? 'light']?.tint || 'green',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: ((route) => {
          if (hiddenRoutes(pathname, hiddenPathnames)) {
            return { display: 'none' };
          }
          return {
            paddingTop: 15,
            paddingBottom: Platform.OS === 'ios' ? 20 : 15,
            minHeight: 74,
            backgroundColor: 'black',
          };
        })(route)
      })}>
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={home} color={`${focused ? "#db530f" :"#ccc916"}`} name="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={news} color={`${focused ? "#db530f" :"#ccc916"}`} name="News" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
