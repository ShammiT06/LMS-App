import { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import CourseCard from "../Components/CourseCard.jsx";
import WebinarCard from "../Components/WebinarCard.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useRouter } from "expo-router";

export default function Browse() {

    const username = "admin";
    const password = "admin@123";
    const token = btoa(`${username}:${password}`);

    const router = useRouter();


    const [search, setSearch] = useState("");
    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(false)

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoadingCourses(true);
                axios
                    .get("https://lms.thirdvizion.com/api/course/", {
                        headers: { Authorization: `Basic ${token}` },
                    })
                    .then((res) => setCourses(res.data))
                    .catch((error) => console.error("Course loading error:", error));
            } catch (err) {
                console.log("API error", err);
            } finally {
                setLoadingCourses(false);
            }
        }

        fetchCourses();
    }, [token]);

    // Filter Courses (example)
    const recommendedCourses = courses.slice(0, 5);
    const freeCourses = courses.filter((c) => c.paid === false);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                {/* Title */}
                <Text style={styles.title}>Browse Courses</Text>

                {/* Search Bar */}
                <View style={styles.searchRow}>
                    <TextInput
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Search Anything"
                        style={styles.searchInput}
                    />
                    <TouchableOpacity style={styles.searchIconBtn}>
                        <Ionicons name="search-outline" size={22} color="#FF6A00" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.filterBtn}>
                        <Feather name="sliders" size={22} color="#FF6A00" />
                    </TouchableOpacity>
                </View>

                {/* SECTION 1: Recommended Courses */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recommended Courses</Text>
                    <TouchableOpacity onPress={() => router.push("/courses/recommended")}>
                        <Text style={styles.viewAll}>View All</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardWrapper} >
                    {recommendedCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            onPress={() => router.push(`/courses/${course.id}`)}
                        />
                    ))}
                </ScrollView>

                {/* SECTION 2: Free Courses */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Free Courses</Text>
                    <TouchableOpacity onPress={() => router.push("/courses/free")}>
                        <Text style={styles.viewAll}>View All</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardWrapper} >
                    {freeCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            onPress={() => router.push(`/courses/${course.id}`)}
                        />
                    ))}
                </ScrollView>

                {/* SECTION 3: Webinars */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Webinars</Text>
                </View>


                {courses.map((course) => (
                    <WebinarCard
                        key={course.id}
                        course={course}
                        onPress={() => router.push(`/courses/${course.id}`)}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#FFF7EE" },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 10,
        marginHorizontal: 20,
        color: "#FF6A00",
    },

    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 20,
    },

    searchInput: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 30,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#F0E0D1",
    },

    searchIconBtn: {
        marginLeft: -35,
        marginRight: 20,
    },

    searchIcon: { fontSize: 22, color: "#FF6A00" },

    filterBtn: {
        backgroundColor: "#FFF",
        padding: 12,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#F0E0D1",
    },

    sectionHeader: {
        marginTop: 10,
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 30,
        marginLeft: 20,
    },

    viewAll: {
        fontSize: 14,
        color: "#FF6A00",
        marginTop: 30,
        marginRight: 20,
    },

    cardWrapper: {
        paddingHorizontal: 10,
    },

    // Recommended Card
    courseName: {
        marginTop: 8,
        fontWeight: "600",
        fontSize: 14,
    },

    courseRating: {
        color: "#888",
        fontSize: 12,
        paddingVertical: 5,
    },
});
