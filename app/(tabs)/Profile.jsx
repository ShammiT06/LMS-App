import { View, Text, StyleSheet, ImageBackground, Dimensions, ScrollView, TouchableOpacity, Modal } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const { height, width } = Dimensions.get("window")

export default function Profile() {

  const [showVersion, setShowVersion] = useState(false);
  const [showSupport, setShowSupport] = useState(false);


  const handleLogout = async () => {
    await AsyncStorage.removeItem("access_token");
    router.replace("/(auth)");
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={require("../../assets/Tabs/profile.png")}
        style={styles.bg}
        resizeMode="cover"
      >
        <View style={styles.container}>


          <View style={styles.orangeCard}>


            <View style={styles.profileWrapper}>
              <View style={styles.profileCircle}>
                <Ionicons name="person" size={55} color="#fff" />
              </View>
              <Text style={styles.nameTxt}>John Doe</Text>
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
          </View>


          <View style={styles.courseCard}>
            <Text style={styles.sectionTitle}>Ongoing Course</Text>
          </View>

          <View style={styles.courseCard}>
            <Text style={styles.sectionTitle}>Course History</Text>
          </View>

          <View style={styles.courseCard}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <View style={{ paddingHorizontal: 20 }}>
              <TouchableOpacity
                style={styles.settingRow}
                onPress={() => setShowVersion(true)}
              >
                <Ionicons name="phone-portrait-outline" size={22} color="#FF6A00" />
                <Text style={styles.settingTxt}>App Version</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="#999" style={{ marginLeft: "auto" }} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.settingRow}
                onPress={() => setShowSupport(true)}
              >
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
          </View>
          <Modal
            visible={showVersion}
            transparent
            animationType="fade"
          >
            <View style={styles.modalWrapper}>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>App Version</Text>
                <Text style={{ fontSize: 16, marginTop: 5 }}>Version 1.0.0</Text>

                <TouchableOpacity onPress={() => setShowVersion(false)} style={styles.closeBtn}>
                  <Text style={styles.closeTxt}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            visible={showSupport}
            transparent
            animationType="fade"
          >
            <View style={styles.modalWrapper}>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>Support</Text>
                <Text style={{ fontSize: 16, marginTop: 5 }}>
                  support.thirdvizion@gmail.com
                </Text>

                <TouchableOpacity onPress={() => setShowSupport(false)} style={styles.closeBtn}>
                  <Text style={styles.closeTxt}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>


        </View>
      </ImageBackground>
    </ScrollView>
  )
}

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
    height: 340,
    marginTop: 25,
    borderRadius: 20,
    elevation: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 20,
    color: "#FF6A00",
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

  modalWrapper: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },

  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    elevation: 10,
    alignItems: "center"
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FF6A00",
  },

  closeBtn: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#FF6A00",
    borderRadius: 10
  },

  closeTxt: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  }
});
