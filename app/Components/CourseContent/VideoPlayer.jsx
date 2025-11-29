import React, { useEffect, useRef, useState } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    ActivityIndicator,
    Pressable,
    Dimensions,
} from "react-native";
import Video from "react-native-video";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";

const { height } = Dimensions.get("window");

export default function VideoPlayer({ video }) {
    const videoRef = useRef(null);
    const [status, setStatus] = useState({});
    const [showControls, setShowControls] = useState(true);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [fullscreen, setFullscreen] = useState(false);
    const [paused, setPaused] = useState(false);

    // Format time into mm:ss
    const formatTime = (seconds) => {
        if (!seconds) return "00:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    // Auto-hide controls after 3 seconds
    useEffect(() => {
        let timer;
        if (showControls) {
            timer = setTimeout(() => setShowControls(false), 3000);
        }
        return () => clearTimeout(timer);
    }, [showControls]);

    const togglePlayPause = () => {
        setPaused((prev) => !prev);
        setShowControls(true); // keep controls visible on toggle
    };

    const toggleFullscreen = async () => {
        if (fullscreen) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        } else {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        }
        setFullscreen(!fullscreen);
        setShowControls(true);
    };

    const changeSpeed = async (value) => {
        setPlaybackRate(value);

        setShowControls(true);

    };


    return (
        <Pressable
            style={fullscreen ? styles.fullVideo : styles.videoBox}
            onPress={() => setShowControls((prev) => !prev)}
        >
            <Video
                ref={videoRef}
                source={{ uri: video.video }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
                paused={paused}
                rate={playbackRate}
                onLoad={(meta) =>
                    setStatus((s) => ({
                        ...s,
                        duration: meta.duration,
                    }))
                }
                onProgress={(meta) =>
                    setStatus((s) => ({
                        ...s,
                        position: meta.currentTime,
                    }))
                }
            />

            {/* CONTROLS UI */}
            {showControls && (
                <View style={styles.controlsContainer}>

                    {/* Play / Pause */}
                    <TouchableOpacity onPress={togglePlayPause}>
                        <Ionicons
                            name={paused ? "play" : "pause"}
                            size={40}
                            color="#fff"
                        />
                    </TouchableOpacity>

                    <View style={styles.bottomRow}>

                        {/* Speed Controls */}
                        <View style={styles.speedRow}>
                            {[0.5, 1.0, 1.5, 2.0].map((s) => (
                                <TouchableOpacity key={s} onPress={() => changeSpeed(s)}>
                                    <Text
                                        style={[
                                            styles.speedText,
                                            playbackRate === s && styles.activeSpeed,
                                        ]}
                                    >
                                        {s}x
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Fullscreen */}
                        <TouchableOpacity onPress={toggleFullscreen}>
                            <Ionicons
                                name={fullscreen ? "contract" : "expand"}
                                size={34}
                                color="#fff"
                            />
                        </TouchableOpacity>

                    </View>

                    {/* Seek Slider */}
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={status.duration || 0}
                        value={status.position || 0}
                        onSlidingComplete={(v) => videoRef.current.seek(v)}
                        minimumTrackTintColor="#CE6013"
                        maximumTrackTintColor="#fff"
                        thumbTintColor="#CE6013"
                    />

                </View>
            )}

            {/* Time Display */}
            <Text style={styles.timeText}>
                {formatTime(status.position)} / {formatTime(status.duration)}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    videoBox: {
        height: height * 0.25,
        backgroundColor: "#000",
        borderRadius: 8,
        overflow: "hidden",
    },
    fullVideo: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        backgroundColor: "#000",
        zIndex: 200,
    },
    controlsContainer: {
        position: "absolute",
        bottom: 20,
        width: "100%",
        alignItems: "center",
        gap: 15,
    },
    slider: {
        width: "90%",
    },
    speedRow: {
        flexDirection: "row",
        gap: 12,
    },
    speedText: {
        color: "#fff",
        fontSize: 14,
    },
    activeSpeed: {
        color: "#CE6013",
        fontWeight: "bold",
    },
    timeText: {
        position: "absolute",
        bottom: 5,
        alignSelf: "center",
        color: "#fff",
        fontSize: 12,
    },
    bottomRow: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 5,
    },

});
