import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { Video } from "expo-av";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function UdemyPlayer({
  sources,
  defaultQuality = "720p",
  resumeTime = 0,
  onProgressSave,
}) {
  const videoRef = useRef(null);

  const [status, setStatus] = useState({});
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [quality, setQuality] = useState(defaultQuality);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let timer;
    if (showControls) {
      timer = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [showControls]);

  const togglePlayPause = () => {
    if (status.isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
  };

  const toggleFullscreen = async () => {
    if (isFullscreen) {
      await videoRef.current.dismissFullscreenPlayer();
    } else {
      await videoRef.current.presentFullscreenPlayer();
    }
    setIsFullscreen(!isFullscreen);
  };

  const changeSpeed = async (value) => {
    setPlaybackRate(value);
    await videoRef.current.setRateAsync(value, true);
  };

  const changeQuality = async (q) => {
    setQuality(q);
    const wasPlaying = status.isPlaying;

    await videoRef.current.unloadAsync();
    await videoRef.current.loadAsync(
      { uri: sources[q] },
      { shouldPlay: wasPlaying, positionMillis: status.positionMillis }
    );
  };

  // save watch progress every 5 seconds
  useEffect(() => {
    if (status.positionMillis && onProgressSave) {
      const interval = setInterval(() => {
        onProgressSave(status.positionMillis);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <Pressable
      style={styles.container}
      onPress={() => setShowControls(!showControls)}
    >
      <Video
        ref={videoRef}
        style={styles.video}
        source={{ uri: sources[quality] }}
        resizeMode="contain"
        shouldPlay
        useNativeControls={false}
        positionMillis={resumeTime}
        onPlaybackStatusUpdate={(s) => setStatus(s)}
      />

      {status.isBuffering && (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      )}

      {showControls && (
        <View style={styles.controlsContainer}>
          {/* Play / Pause */}
          <TouchableOpacity onPress={togglePlayPause}>
            <Ionicons
              name={status.isPlaying ? "pause" : "play"}
              size={40}
              color="#fff"
            />
          </TouchableOpacity>

          {/* Slider */}
          <Slider
            minimumValue={0}
            maximumValue={status.durationMillis || 1}
            value={status.positionMillis || 0}
            onSlidingComplete={(v) => videoRef.current.setPositionAsync(v)}
            minimumTrackTintColor="#CE6013"
            maximumTrackTintColor="#fff"
            thumbTintColor="#CE6013"
            style={{ width: "90%" }}
          />

          {/* Speed Control */}
          <View style={styles.speedRow}>
            {[0.5, 1, 1.5, 2].map((s) => (
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

          {/* Quality Control */}
          <View style={styles.qualityRow}>
            {Object.keys(sources).map((q) => (
              <TouchableOpacity key={q} onPress={() => changeQuality(q)}>
                <Text
                  style={[
                    styles.qualityText,
                    quality === q && styles.activeQuality,
                  ]}
                >
                  {q}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Fullscreen */}
          <TouchableOpacity onPress={toggleFullscreen}>
            <Ionicons
              name={isFullscreen ? "contract" : "expand"}
              size={30}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: height * 0.33,
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  loader: {
    position: "absolute",
    top: "45%",
    alignSelf: "center",
  },
  controlsContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
    gap: 15,
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
  qualityRow: {
    flexDirection: "row",
    gap: 12,
  },
  qualityText: {
    color: "#fff",
    fontSize: 14,
  },
  activeQuality: {
    color: "#CE6013",
    fontWeight: "bold",
  },
});
