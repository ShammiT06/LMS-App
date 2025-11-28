import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import CourseCard from "../Components/CourseCard";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function Index() {
  const [name, setName] = useState("");
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  const scrollX = useRef(new Animated.Value(0)).current;
  const router = useRouter();

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

  // Fetch Courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://lms.thirdvizion.com/api/course/", {
          headers: { Authorization: `Basic ${token}` },
        });
        setCourses(res.data);
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [token]);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://lms.thirdvizion.com/api/coursecategory/",
          { headers: { Authorization: `Basic ${token}` } }
        );
        setCategories(res.data);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [token]);

  // 🔥 Category Card UI Inside Same File
  const CARD_WIDTH = 150;
  const CARD_HEIGHT = 170;

  const CategoryCard = ({ item, index }) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          transform: [{ scale }],
          marginRight: 20,
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
        }}
      >
        <TouchableOpacity activeOpacity={0.9} style={styles.categoryCard}>
          <Image
            source={{
              uri: item.image || "https://via.placeholder.com/150.png",
            }}
            style={styles.categoryImage}
          />

          <View style={styles.categoryOverlay}>
            <Text style={styles.categoryTitle}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
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

        {/* TOP CATEGORY */}
        <Text style={[styles.sectionTitle, { marginTop: 25 }]}>
          Top Categories
        </Text>

        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 20 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {categories.map((item, index) => (
            <CategoryCard key={item.id} item={item} index={index} />
          ))}
        </Animated.ScrollView>

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
              onPress={() => router.push(`/courses/${item.id}`)}
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

  welcomeText: { fontSize: 13, color: "#8F8F8F" },

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

  // ⭐ PROFESSIONAL CATEGORY CARD STYLE
  categoryCard: {
    height: 170,
    width: 150,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#FFF",

    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },

    // Android shadow
    elevation: 6,
  },

  categoryImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },

  categoryOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0,0,0,0.40)",
  },

  categoryTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
