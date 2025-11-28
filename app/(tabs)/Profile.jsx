import { View, Text, StyleSheet, ImageBackground, Dimensions, ScrollView } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";

const { height, width } = Dimensions.get("window")

export default function Profile() {
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
            </View>  
            <View>
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

          </View>
          <View style={{ height: 400 }} />

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
    paddingTop: height * 0.10,  
    paddingBottom: 50,
    elevation: 10,
  },
  nameTxt:{
    textAlign:"center",
    color:"#fff",
    marginTop:10,
    fontSize:20,
  },
  orangeCard: {
    width: "100%",
    backgroundColor: "#ff6b00",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: -130, 
    elevation: 10,
  },


  profileWrapper: {
    alignItems: "center",
    marginTop: -70,
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

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
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
  courseCard:{
    backgroundColor:"#FFF7EB"
  },
  statLabel: {
    fontSize: 14,
    color: "#fff",
    marginTop: 3,
  },

  text: {
    fontSize: width * 0.045,
    color: "#555",
    marginVertical: 10,
  },
})
