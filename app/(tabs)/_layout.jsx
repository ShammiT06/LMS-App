import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs
     screenOptions={{
  tabBarActiveTintColor: "#FF6A00",
  tabBarInactiveTintColor: "#8e8e8e",
  tabBarStyle: {
    paddingBottom: 12,   
    paddingTop: 6,
    height: 70,          
    backgroundColor: "#ffffff",
  },
  tabBarSafeAreaInset: { bottom: 'always' }, 
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: "600",
    paddingBottom: 4,    
  },
  headerShown: false,
}}

    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Browse"
        options={{
          title: "Browse",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Course"
        options={{
          title: "Course",
          tabBarIcon: ({ color }) => (
            <Ionicons name="book-outline" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
