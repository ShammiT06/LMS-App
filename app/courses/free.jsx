import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";
import CourseCard from "../Components/CourseCard";
import axios from "axios";
import { useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FreeCoursesScreen() {
    const router = useRouter();

    const username = "admin";
    const password = "admin@123";
    const token = btoa(`${username}:${password}`);

    const [search, setSearch] = useState("");
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch courses
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const res = await axios.get("https://lms.thirdvizion.com/api/course/", {
                    headers: { Authorization: `Basic ${token}` },
                });
                setCourses(res.data);
            } catch (error) {
                console.log("API error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [token]);

    const freeCourses = courses.filter((c) => c.paid === false);

    return (
        <SafeAreaView style={styles.safeArea}>

            {/* FIXED HEADER */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={26} color="#FF6A00" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Free Courses</Text>
            </View>

            {/* FIXED SEARCH & FILTER */}
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

            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

                <View style={styles.wrapper}>
                    {freeCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            onPress={() => router.push(`/courses/${course.id}`)}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    safeArea: { flex: 1, backgroundColor: "#FFF7EE" },

    // HEADER
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
    },

    headerTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FF6A00",
        marginLeft: 10,
    },

    // Search Row
    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 20,
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

    filterBtn: {
        backgroundColor: "#FFF",
        padding: 12,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#F0E0D1",
    },


    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 10,
        marginHorizontal: 20,
        color: "#FF6A00",
    },
    wrapper: {
        paddingHorizontal: 15,
        paddingTop: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});
