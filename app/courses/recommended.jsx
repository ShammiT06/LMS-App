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
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function RecommendedCoursesPage() {
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

    // Recommended: first 5 courses
    const recommended = courses.slice(0, 5);

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* FIXED HEADER */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={26} color="#FF6A00" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Recommended Courses</Text>
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

            {/* VERTICAL LIST */}
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                {recommended.map((course) => (
                    <View key={course.id} style={styles.card}>
                        <Image source={{ uri: course.image }} style={styles.cardImage} />

                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{course.name}</Text>
                            <Text style={styles.rating}>⭐ {course.ratings}</Text>

                            <View style={styles.freeButtonsRow}>
                                <TouchableOpacity style={styles.viewBtn}>
                                    <Text style={styles.viewText}>View Course</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
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

    // Course Card
    card: {
        flexDirection: "row",
        backgroundColor: "#FFF",
        padding: 15,
        marginHorizontal: 20,
        marginTop: 16,
        borderRadius: 15,
    },

    cardImage: {
        width: 80,
        height: 80,
        backgroundColor: "#DDD",
        borderRadius: 10,
    },

    cardContent: {
        flex: 1,
        paddingLeft: 15,
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: "600",
    },

    rating: {
        color: "#777",
        marginVertical: 4,
    },

    freeButtonsRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: "auto",
    },

    viewBtn: {
        borderWidth: 1,
        borderColor: "#FF6A00",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        // alignSelf: "flex-start",
    },



    viewText: {
        color: "#FF6A00",
        fontWeight: "600",
        fontSize: 12,
    },
});
