import { useState } from "react";
import axios from "axios";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function SuggestionScreen() {
    const router = useRouter();

    const username = "admin";
    const password = "admin@123";
    const token = btoa(`${username}:${password}`);

    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({});
    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(false);

    const questions = {
        1: {
            question: "What are you interested in learning?",
            options: ["Python", "Wellness", "AI & ML", "Web Development"],
            key: "q3",
        },
        2: {
            question: "How comfortable are you with the topic?",
            options: ["Not comfortable", "Basic level", "Intermediate", "Advanced"],
            key: "q2",
        },
        3: {
            question: "How much time can you spend daily?",
            options: ["30 mins", "1 hour", "2 hours", "3+ hours"],
            key: "q5",
        },
        4: {
            question: "What’s your main goal?",
            options: ["Get a job", "Learn basics", "Skill upgrade", "Build projects"],
            key: "q4",
        },
    };

    const fetchCourses = async () => {
        try {
            setLoadingCourses(true);
            axios.get("https://lms.thirdvizion.com/api/course/", {
                headers: { Authorization: `Basic ${token}` },
            })
                .then((res) => setCourses(res.data))
                .catch((error) => console.error("Course loading error:", error));
        } catch (err) {
            console.log("API error", err);
        } finally {
            setLoadingCourses(false);
        }
    };

    const handleSelect = (option) => {
        const key = questions[step].key;

        const updated = { ...answers, [key]: option };
        setAnswers(updated);

        if (step < 4) {
            setStep(step + 1);
        } else {
            fetchCourses(); // fetch API
            setStep("result");
        }
    };

    const handleSkip = () => router.back();

    const getRecommendedCourses = () => {
        const category = answers.q3;

        if (!category || courses.length === 0) return [];

        // Show courses that match chosen category
        const filtered = courses.filter((course) =>
            course.categories.includes(category)
        );

        // If no match, return all
        return filtered.length > 0 ? filtered : courses;
    };

    const recommended = getRecommendedCourses();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={handleSkip}>
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>

                    {step !== "result" && (
                        <Text style={styles.stepIndicator}>Step {step}/4</Text>
                    )}
                </View>

                {step !== "result" ? (
                    <>
                        <Text style={styles.questionText}>{questions[step].question}</Text>

                        <View style={styles.optionsContainer}>
                            {questions[step].options.map((opt, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handleSelect(opt)}
                                    style={styles.optionBtn}
                                >
                                    <Text style={styles.optionText}>{opt}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                ) : loadingCourses ? (
                    <ActivityIndicator size="large" color="#2563EB" />
                ) : (
                    <ScrollView style={{ marginTop: 10 }}>
                        <Text style={styles.resultTitle}>Recommended Courses</Text>

                        {recommended.map((course) => (
                            <View key={course.id} style={styles.card}>
                                <Image
                                    source={{ uri: course.image }}
                                    style={styles.cardImage}
                                />

                                <View style={styles.cardContent}>
                                    <Text style={styles.cardTitle}>{course.name}</Text>

                                    <Text
                                        numberOfLines={3}
                                        style={styles.cardDescription}
                                    >
                                        {course.description}
                                    </Text>

                                    <Text style={styles.cardMeta}>
                                        {course.total_chap} Chapters • {course.duration} mins
                                    </Text>

                                    <TouchableOpacity style={styles.cardBtn}>
                                        <Text style={styles.cardBtnText}>View Course</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}

                        <TouchableOpacity style={styles.closeResultBtn} onPress={handleSkip}>
                            <Text style={styles.closeResultText}>Close</Text>
                        </TouchableOpacity>
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#FFF" },
    container: { flex: 1, padding: 20 },

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    skipText: {
        fontSize: 16,
        color: "#6B7280",
        fontWeight: "500",
    },

    stepIndicator: {
        fontSize: 14,
        color: "#6B7280",
    },

    questionText: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },

    optionsContainer: { marginTop: 10 },

    optionBtn: {
        backgroundColor: "#E5E7EB",
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 12,
        marginBottom: 12,
    },

    optionText: { fontSize: 16, fontWeight: "500" },

    resultTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
    },

    card: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        marginBottom: 20,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    cardImage: {
        width: "100%",
        height: 150,
    },

    cardContent: {
        padding: 15,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 6,
    },

    cardDescription: {
        fontSize: 14,
        color: "#6B7280",
    },

    cardMeta: {
        marginTop: 8,
        fontSize: 12,
        color: "#9CA3AF",
    },

    cardBtn: {
        marginTop: 12,
        backgroundColor: "#2563EB",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
    },

    cardBtnText: {
        color: "#FFF",
        fontWeight: "600",
    },

    closeResultBtn: {
        marginTop: 30,
        backgroundColor: "#2563EB",
        padding: 16,
        borderRadius: 10,
    },

    closeResultText: {
        textAlign: "center",
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
});
