import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import CourseCard from "../Components/CourseCard";
import { useRouter } from "expo-router";   // 👈 ADDED

const { width } = Dimensions.get("window");

export default function Index() {
  const [name, setName] = useState("");
  const [courses, setCourses] = useState([]);

  const router = useRouter();  // 👈 ADDED

  const userName = "admin";
  const password = "admin@123";

  const token = btoa(`${userName}:${password}`);

  useEffect(() => {
    const loadName = async () => {
      const storedName = await AsyncStorage.getItem("user_name");
      if (storedName) setName(storedName);
    };
    loadName();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://lms.thirdvizion.com/api/course/", {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        setCourses(res.data);
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

  
        <View style={styles.header}>
          <View style={styles.profileCircle}>
            <Ionicons name="person" size={26} color="#FFF" />
          </View>

          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.greeting}>Hi, {name}</Text>
          </View>

          <TouchableOpacity style={styles.bellWrapper}>
            <Ionicons name="notifications-outline" size={22} color="#FF7900" />
          </TouchableOpacity>
        </View>
        <Text style={[styles.sectionTitle, { marginTop: 25 }]}>
          Top Category
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
        >
          {courses.map((item) => (
            <CourseCard
              key={item.id}
              course={item}
              onPress={() => router.push(`/courses/${item.id}`)}
            />
          ))}
        </ScrollView>

        {/* RECOMMENDED COURSES */}
        <Text style={styles.sectionTitle}>Recommended Courses</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
        >
          {courses.map((item) => (
            <CourseCard
              key={item.id}
              course={item}
              onPress={() => router.push(`/courses/${item.id}`)} // 👈 NAVIGATION
            />
          ))}
        </ScrollView>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBF5",
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 5,
  },

  profileCircle: {
    height: 55,
    width: 55,
    backgroundColor: "#FF7900",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  welcomeText: {
    fontSize: 13,
    color: "#8F8F8F",
  },

  greeting: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginTop: 2,
  },

  bellWrapper: {
    height: 44,
    width: 44,
    backgroundColor: "#FFE8D1",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  sectionTitle: {
    marginTop: 25,
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
});
