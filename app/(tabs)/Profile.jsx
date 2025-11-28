import { 
  View, Text, StyleSheet, ImageBackground, Dimensions, 
  ScrollView, TouchableOpacity, Modal 
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import CourseCard from "../Components/CourseCard";
import axios from "axios";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const { height, width } = Dimensions.get("window");

export default function Profile() {

  const [showVersion, setShowVersion] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [name, setName] = useState("");

  const [ongoingCourses, setOngoing] = useState([]);
  const [historyCourses, setHistory] = useState([]);

  const username = "admin";
  const password = "admin@123";
  const token = btoa(`${username}:${password}`);

  /* FETCH USER NAME */
  useEffect(() => {
    const loadName = async () => {
      const storedName = await AsyncStorage.getItem("user_name");
      if (storedName) setName(storedName);
    };
    loadName();
  }, []);

  /* FETCH COURSES FROM API */
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://lms.thirdvizion.com/api/course/", {
          headers: { Authorization: `Basic ${token}` },
        });

        const courses = res.data;

        const ongoing = courses.filter(c => c.status === "ongoing" || c.status === "active");
        const history = courses.filter(c => c.status === "completed" || c.status === "finished");

        if (ongoing.length === 0 && history.length === 0) {
          setOngoing(courses.slice(0, 2));
          setHistory(courses.slice(2));
        } else {
          setOngoing(ongoing);
          setHistory(history);
        }

      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("access_token");
    router.replace("/(auth)");
  };

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require("../../assets/Tabs/profile.png")}
        style={styles.bg}
        resizeMode="cover"
      >
        <View style={styles.container}>

          {/* PROFILE CARD */}
          <Animated.View entering={FadeInDown.duration(600)} style={styles.orangeCard}>
            
            <View style={styles.profileWrapper}>
              <View style={styles.profileCircle}>
                <Ionicons name="person" size={55} color="#fff" />
              </View>
              <Text style={styles.nameTxt}>{name}</Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Ionicons name="book" size={26} color="#fff" />
                <Text style={styles.statNumber}>20</Text>
                <Text style={styles.statLabel}>Course</Text>
              </View>

              <View style={styles.statBox}>
                <Ionicons name="time" size={26} color="#fff" />
                <Text style={styles.statNumber}>26</Text>
                <Text style={styles.statLabel}>Hours</Text>
              </View>

              <View style={styles.statBox}>
                <Ionicons name="layers" size={26} color="#fff" />
                <Text style={styles.statNumber}>120</Text>
                <Text style={styles.statLabel}>Modules</Text>
              </View>
            </View>

          </Animated.View>


          {/* ONGOING COURSE */}
          <Animated.View entering={FadeInUp.delay(200)} style={styles.courseCard}>
            <Text style={styles.sectionTitle}>Ongoing Course</Text>

            <View style={styles.cardWrapper}>
              {ongoingCourses.length > 0 ? (
                ongoingCourses.map((c, index) => (
                  <Animated.View 
                    key={c.id}
                    entering={FadeInDown.delay(100 * index)}
                    style={styles.singleCourseBox}
                  >
                    <CourseCard course={c} onPress={() => {}} />
                  </Animated.View>
                ))
              ) : (
                <Text style={styles.emptyMsg}>No ongoing courses</Text>
              )}
            </View>
          </Animated.View>


          {/* COURSE HISTORY */}
          <Animated.View entering={FadeInUp.delay(400)} style={styles.courseCard}>
            <Text style={styles.sectionTitle}>Course History</Text>

            <View style={styles.cardWrapper}>
              {historyCourses.length > 0 ? (
                historyCourses.map((c, index) => (
                  <Animated.View 
                    key={c.id}
                    entering={FadeInDown.delay(100 * index)}
                    style={styles.singleCourseBox}
                  >
                    <CourseCard course={c} onPress={() => {}} />
                  </Animated.View>
                ))
              ) : (
                <Text style={styles.emptyMsg}>No completed courses</Text>
              )}
            </View>
          </Animated.View>


          {/* SETTINGS */}
          <Animated.View entering={FadeInUp.delay(550)} style={styles.courseCard}>
            <Text style={styles.sectionTitle}>Settings</Text>

            <View style={{ paddingHorizontal: 20 }}>

              <TouchableOpacity style={styles.settingRow} onPress={() => setShowVersion(true)}>
                <Ionicons name="phone-portrait-outline" size={22} color="#FF6A00" />
                <Text style={styles.settingTxt}>App Version</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="#999" style={{ marginLeft: "auto" }} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingRow} onPress={() => setShowSupport(true)}>
                <Ionicons name="mail-outline" size={22} color="#FF6A00" />
                <Text style={styles.settingTxt}>Support</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="#999" style={{ marginLeft: "auto" }} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingRow} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={22} color="#FF6A00" />
                <Text style={styles.settingTxt}>Log Out</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="#999" style={{ marginLeft: "auto" }} />
              </TouchableOpacity>

            </View>
          </Animated.View>

        </View>
      </ImageBackground>
    </ScrollView>
  );
}



/* ================================
        STYLES
================================ */
const styles = StyleSheet.create({
  bg: {
    width: "100%",
    minHeight: height,
  },

  container: {
    backgroundColor: "#fff",
    marginTop: height * 0.22,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: width * 0.05,
    paddingTop: 90,
    paddingBottom: 50,
  },

  orangeCard: {
    width: "100%",
    backgroundColor: "#ff6b00",
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: -130,
    alignItems: "center",
    elevation: 10,
  },

  profileWrapper: {
    alignItems: "center",
    marginTop: -60,
  },

  profileCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#ff6b00",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },

  nameTxt: {
    textAlign: "center",
    color: "#fff",
    marginTop: 10,
    fontSize: 20,
    fontWeight: "600"
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    width: "100%",
  },

  statBox: {
    width: "30%",
    backgroundColor: "#e65c00",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  },

  statLabel: {
    fontSize: 14,
    color: "#fff",
    marginTop: 2,
  },

  courseCard: {
    backgroundColor: "#FFF7EB",
    width: "100%",
    minHeight: 150,
    marginTop: 25,
    borderRadius: 20,
    elevation: 10,
    paddingBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 20,
    color: "#FF6A00",
  },

  cardWrapper: {
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  singleCourseBox: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  emptyMsg: {
    color: "#999",
    fontSize: 14,
    textAlign: "center",
    padding: 10,
  },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#FFE3C8",
  },

  settingTxt: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginLeft: 10,
  },
});
