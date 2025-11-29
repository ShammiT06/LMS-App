import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import axios from "axios";
import ProgressCard from "../Components/ProgressCard.jsx";

export default function EnrolledCourses() {
  const router = useRouter();

  const username = "admin";
  const password = "admin@123";
  const token = btoa(`${username}:${password}`);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://lms.thirdvizion.com/api/course/",
          {
            headers: { Authorization: `Basic ${token}` },
          }
        );
        setCourses(response.data || []);
      } catch (error) {
        console.error("Failed to load enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>

        <Text style={styles.title}>My Enrolled Courses</Text>

        {loading ? (
          <View style={styles.loaderBox}>
            <ActivityIndicator size="large" color="#FF6A00" />
            <Text style={styles.loadingText}>Loading your courses...</Text>
          </View>
        ) : (
          <View style={styles.listWrapper}>
            {courses.map((course) => (
              <ProgressCard
                key={course.id}
                course={course}
                onPress={() => router.push(`/courses/${course.id}`)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF7EE",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    color: "#FF6A00",
  },

  listWrapper: {
    paddingTop: 5,
  },

  loaderBox: {
    marginTop: 50,
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#2A346D",
  },
});
