
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function WebinarCard({ course, onPress }) {
    if (!course) return null;

    return (
        <View key={course.id} style={styles.freeCard}
            onPress={() => onPress && onPress(course)}
        >
            <Image source={{ uri: course.image || "https://via.placeholder.com/150", }} style={styles.freeImage} />

            <View style={styles.freeContent}>
                <Text style={styles.freeCourseName}>{course.name}</Text>
                <Text style={styles.freeCourseRating}>⭐ {course.ratings}</Text>

                <View style={styles.freeButtonsRow}>
                    <TouchableOpacity style={styles.enrollBtn}>
                        <Text style={styles.enrollText}>Enroll Now</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // Free Courses
    freeCard: {
        flexDirection: "row",
        backgroundColor: "#FFF",
        padding: 15,
        marginHorizontal: 20,
        marginTop: 16,
        borderRadius: 15,
        position: "relative",
    },
    freeImage: {
        width: 80,
        height: 80,
        backgroundColor: "#DDD",
        borderRadius: 10,
    },
    freeContent: {
        flex: 1,
        paddingLeft: 15,
    },

    freeCourseName: {
        fontSize: 16,
        fontWeight: "600",
    },

    freeCourseRating: {
        color: "#777",
        marginVertical: 4,
    },

    freeButtonsRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: "auto",
    },

    enrollBtn: {
        backgroundColor: "#FF6A00",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },

    enrollText: {
        color: "#FFF",
        fontWeight: "600",
        fontSize: 12
    },

});
