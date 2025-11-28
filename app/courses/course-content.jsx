import React, { useEffect, useState, useRef } from "react";
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
import Slider from "@react-native-community/slider";
import * as ScreenOrientation from "expo-screen-orientation";

export default function CourseContent() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [course, setCourse] = useState(null);
    const [playingVideo, setPlayingVideo] = useState(null);
    const videoRef = useRef(null);

    const [status, setStatus] = useState({});
    const [isFullScreen, setIsFullScreen] = useState(false);

    const username = "admin";
    const password = "admin@123";
    const token = btoa(`${username}:${password}`);

    // Fetch Course
    useEffect(() => {
        axios
            .get(`https://lms.thirdvizion.com/api/course/${id}/`, {
                headers: { Authorization: `Basic ${token}` },
            })
            .then((res) => setCourse(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    // Force Landscape
    async function enterFullscreen() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        setIsFullScreen(true);
    }

    async function exitFullscreen() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        setIsFullScreen(false);
    }

    useEffect(() => {
        return () => exitFullscreen();
    }, []);

    const formatTime = (ms) => {
        if (!ms) return "0:00";
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    if (!course) return null;

    return (
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>
            {/* CUSTOM VIDEO PLAYER */}
            {playingVideo && (
                <View style={isFullScreen ? styles.fullVideoWrapper : styles.videoWrapper}>

                    <Video
                        ref={videoRef}
                        source={{ uri: playingVideo }}
                        style={styles.video}
                        resizeMode="contain"
                        shouldPlay
                        onPlaybackStatusUpdate={(s) => setStatus(s)}
                    />

                    {/* Top Controls */}
                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={exitFullscreen}
                    >
                        {isFullScreen && (
                            <Ionicons name="close-circle" size={32} color="#FFF" />
                        )}
                    </TouchableOpacity>

                    {/* Play - Pause + Fullscreen Buttons */}
                    <View style={styles.controls}>
                        <TouchableOpacity
                            onPress={() =>
                                status.isPlaying
                                    ? videoRef.current.pauseAsync()
                                    : videoRef.current.playAsync()
                            }
                        >
                            <Ionicons
                                name={status.isPlaying ? "pause" : "play"}
                                size={38}
                                color="#FFF"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() =>
                                isFullScreen ? exitFullscreen() : enterFullscreen()
                            }
                        >
                            <Ionicons
                                name={isFullScreen ? "contract" : "expand"}
                                size={35}
                                color="#FFF"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Progress Bar */}
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={status.durationMillis || 0}
                        value={status.positionMillis || 0}
                        onSlidingComplete={(v) =>
                            videoRef.current.setPositionAsync(v)
                        }
                        minimumTrackTintColor="#FF6A00"
                        maximumTrackTintColor="#FFFFFF"
                        thumbTintColor="#FF6A00"
                    />

                    {/* Time */}
                    <Text style={styles.timeText}>
                        {formatTime(status.positionMillis)} /{" "}
                        {formatTime(status.durationMillis)}
                    </Text>
                </View>
            )}

            {!playingVideo && (
                <Text style={styles.selectVideoText}>
                    Select a video to start learning
                </Text>
            )}

            {/* CONTENT SCROLL */}
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
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

                {/* Chapters */}
                <Text style={styles.sectionTitle}>Chapters</Text>

                {course.chapters?.map((ch) => (
                    <View key={ch.id} style={styles.chapterBox}>
                        <Text style={styles.chapterTitle}>{ch.title}</Text>

                        {ch.videos?.length > 0 ? (
                            ch.videos.map((v) => (
                                <TouchableOpacity
                                    key={v.id}
                                    style={styles.videoItem}
                                    onPress={async () => {
                                        setPlayingVideo(v.video);

                                        // Auto fullscreen
                                        setTimeout(() => {
                                            enterFullscreen();
                                        }, 300);
                                    }}
                                >
                                    <Ionicons
                                        name="play-circle-outline"
                                        size={22}
                                        color="#FF6A00"
                                    />
                                    <Text style={styles.videoName}>{v.video_name}</Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={styles.emptyText}>No videos available</Text>
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        backgroundColor: "#FFF",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 10,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 10,
        color: "#FF6A00",
    },

    videoWrapper: {
        width: "100%",
        height: 250,
        backgroundColor: "#000",
        overflow: "hidden",
    },

    fullVideoWrapper: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        zIndex: 1000,
        top: 0,
        left: 0,
    },

    video: {
        width: "100%",
        height: "100%",
    },

    controls: {
        position: "absolute",
        bottom: 55,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },

    slider: {
        position: "absolute",
        bottom: 30,
        width: "95%",
        alignSelf: "center",
    },

    timeText: {
        position: "absolute",
        bottom: 5,
        alignSelf: "center",
        color: "#FFF",
        fontSize: 12,
    },

    closeBtn: {
        position: "absolute",
        top: 10,
        right: 10,
    },

    selectVideoText: {
        textAlign: "center",
        padding: 20,
        color: "#777",
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
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
});
