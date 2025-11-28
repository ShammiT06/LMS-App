import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";

export default function CourseContent() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [course, setCourse] = useState(null);
    const [playingVideo, setPlayingVideo] = useState(null);

    const username = "admin";
    const password = "admin@123";
    const token = btoa(`${username}:${password}`);

    useEffect(() => {
        axios
            .get(`https://lms.thirdvizion.com/api/course/${id}/`, {
                headers: { Authorization: `Basic ${token}` },
            })
            .then((res) => setCourse(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    if (!course) return null;

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Ionicons
                    name="chevron-back"
                    size={28}
                    color="#FF6A00"
                    onPress={() => router.back()}
                />
                <Text style={styles.title}>{course.name}</Text>
            </View>

            {/* Currently Playing Video */}
            {playingVideo ? (
                <View style={styles.videoWrapper}>
                <Video
                    source={{ uri: playingVideo }}
                    style={styles.video}
                    useNativeControls
                    resizeMode="contain"
                    shouldPlay
                />
                </View>
            ) : (
                <Text style={styles.selectVideoText}>Select a video to start learning</Text>
            )}

            {/* Chapters */}
            <Text style={styles.sectionTitle}>Chapters</Text>

            {course.chapters.map((ch) => (
                <View key={ch.id} style={styles.chapterBox}>
                    <Text style={styles.chapterTitle}>{ch.title}</Text>

                    {/* Videos */}
                    {ch.videos.length > 0 ? (
                        ch.videos.map((v) => (
                            <TouchableOpacity
                                key={v.id}
                                style={styles.videoItem}
                                onPress={() => setPlayingVideo(v.video)}
                            >
                                <Ionicons name="play-circle-outline" size={22} color="#FF6A00" />
                                <Text style={styles.videoName}>{v.video_name}</Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={styles.emptyText}>No videos available</Text>
                    )}

                    {/* Materials */}
                    {ch.materials.length > 0 && (
                        <>
                            <Text style={styles.subTitle}>Materials</Text>
                            {ch.materials.map((m) => (
                                <TouchableOpacity key={m.id} style={styles.materialItem}>
                                    <Ionicons name="document-outline" size={20} color="#555" />
                                    <Text style={styles.materialName}>{m.material_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </>
                    )}
                </View>
            ))}
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

videoWrapper: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
},

video: {
    width: "100%",
    height: "100%",
},


    selectVideoText: {
        textAlign: "center",
        color: "#777",
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10,
    },

    chapterBox: {
        backgroundColor: "#FFF7EE",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },

    chapterTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },

    videoItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
    },

    videoName: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: "500",
    },

    emptyText: {
        color: "#999",
        marginBottom: 10,
    },

    subTitle: {
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 5,
    },

    materialItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
    },

    materialName: {
        marginLeft: 10,
        fontSize: 15,
    },
});
