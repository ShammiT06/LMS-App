// import React, { useEffect, useState } from "react";
// import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import axios from "axios";
// import { Ionicons } from "@expo/vector-icons";

// export default function CourseDetails() {
//     const { id } = useLocalSearchParams();
//     const router = useRouter();

//     const [course, setCourse] = useState(null);

//     const username = "admin";
//     const password = "admin@123";
//     const token = btoa(`${username}:${password}`);

//     useEffect(() => {
//         axios
//             .get(`https://lms.thirdvizion.com/api/course/${id}/`, {
//                 headers: { Authorization: `Basic ${token}` },
//             })
//             .then((res) => setCourse(res.data))
//             .catch((err) => console.log(err));
//     }, [id, token]);

//     if (!course) return null;

//     return (
//         <ScrollView style={styles.container}>
//             {/* Back button */}
//             <View style={styles.header}>
//                 <Ionicons
//                     name="chevron-back"
//                     size={28}
//                     color="#FF6A00"
//                     onPress={() => router.back()}
//                 />
//                 <Text style={styles.title}>{course.name}</Text>
//             </View>

//             <Image source={{ uri: course.image }} style={styles.image} />

//             <Text style={styles.description}>{course.description}</Text>

//             <Text style={styles.sectionTitle}>Ratings: ⭐ {course.ratings}</Text>

//             <Text style={styles.sectionTitle}>Chapters</Text>
//             {course.chapters.map((ch) => (
//                 <View key={ch.id} style={styles.chapter}>
//                     <Text style={styles.chapterTitle}>{ch.title}</Text>
//                 </View>
//             ))}
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#FFF",
//         padding: 20,
//     },
//     header: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 20,
//     },
//     title: {
//         fontSize: 22,
//         fontWeight: "bold",
//         marginLeft: 10,
//         color: "#FF6A00",
//     },
//     image: {
//         width: "100%",
//         height: 200,
//         borderRadius: 12,
//         marginBottom: 20,
//     },
//     description: {
//         fontSize: 16,
//         color: "#444",
//         marginBottom: 20,
//         lineHeight: 22,
//     },
//     sectionTitle: {
//         fontSize: 18,
//         fontWeight: "bold",
//         marginTop: 20,
//         marginBottom: 10,
//     },
//     chapter: {
//         padding: 12,
//         backgroundColor: "#FFF7EE",
//         borderRadius: 8,
//         marginBottom: 10,
//     },
//     chapterTitle: {
//         fontWeight: "600",
//     },
// });



import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function CourseDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [course, setCourse] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState({ username: "", email: "" });

    const username = "admin";
    const password = "admin@123";
    const token = btoa(`${username}:${password}`);

    // Load user details from AsyncStorage
    useEffect(() => {
        const loadUser = async () => {
            const data = await AsyncStorage.getItem("userData");
            if (data) setUserData(JSON.parse(data));
        };
        loadUser();
    }, []);

    // Fetch course details
    useEffect(() => {
        axios
            .get(`https://lms.thirdvizion.com/api/course/${id}/`, {
                headers: { Authorization: `Basic ${token}` },
            })
            .then((res) => setCourse(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    if (!course) return null;

    const handleEnroll = () => {
        setModalVisible(true);
        // router.push({ pathname: `https://lms.thirdvizion.com/course/${id}/`, })
    };

    const submitEnrollment = () => {
        setModalVisible(false);

        // redirect to course content page
        router.push({ pathname: "/courses/course-content", params: { id } });
    };


    return (
        <ScrollView style={styles.container}>
            {/* Back button */}
            <View style={styles.header}>
                <Ionicons
                    name="chevron-back"
                    size={28}
                    color="#FF6A00"
                    onPress={() => router.back()}
                />
                <Text style={styles.title}>{course.name}</Text>
            </View>

            <Image source={{ uri: course.image }} style={styles.image} />

            <Text style={styles.description}>{course.description}</Text>

            <Text style={styles.sectionTitle}>Ratings: ⭐ {course.ratings}</Text>

            <Text style={styles.sectionTitle}>Chapters</Text>
            {course.chapters.map((ch) => (
                <View key={ch.id} style={styles.chapter}>
                    <Text style={styles.chapterTitle}>{ch.title}</Text>
                </View>
            ))}

            {/* ENROLL BUTTON */}
            <TouchableOpacity style={styles.enrollBtn} onPress={handleEnroll}>
                <Text style={styles.enrollText}>Enroll Now</Text>
            </TouchableOpacity>

            {/* MODAL */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Enroll in {course.name}</Text>

                        <TextInput
                            value={userData.username}
                            style={styles.input}
                            editable={false}
                        />

                        <TextInput
                            value={userData.email}
                            style={styles.input}
                            editable={false}
                        />

                        <TouchableOpacity style={styles.submitBtn} onPress={submitEnrollment}>
                            <Text style={styles.submitText}>Submit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFF", padding: 20 },

    header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 10,
        color: "#FF6A00",
    },

    image: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 20,
        objectFit: "cover"
    },

    description: {
        fontSize: 16,
        color: "#444",
        marginBottom: 20,
        lineHeight: 22,
        textAlign: "justify",
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },

    chapter: {
        padding: 12,
        backgroundColor: "#FFF7EE",
        borderRadius: 8,
        marginBottom: 10,
    },

    chapterTitle: {
        fontWeight: "600",
    },

    enrollBtn: {
        backgroundColor: "#FF6A00",
        padding: 14,
        borderRadius: 10,
        marginTop: 20,
    },

    enrollText: {
        color: "#FFF",
        fontWeight: "600",
        textAlign: "center",
        fontSize: 16,
    },

    // MODAL
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 20,
    },

    modalBox: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 12,
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#FF6A00",
    },

    input: {
        backgroundColor: "#FFF7EE",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#FFD4B3",
        marginBottom: 12,
    },

    submitBtn: {
        backgroundColor: "#FF6A00",
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
    },

    submitText: {
        color: "#FFF",
        textAlign: "center",
        fontWeight: "600",
        fontSize: 16,
    },

    cancelBtn: {
        padding: 12,
        marginTop: 10,
    },

    cancelText: {
        color: "#777",
        textAlign: "center",
        fontWeight: "500",
    },
});
