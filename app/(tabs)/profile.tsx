import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header Background - Now just the top bar */}
      <View style={styles.darkHeader}>
        <SafeAreaView>
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
            {/* Setting icon removed, added empty View to maintain title centering */}
            <View style={{ width: 40 }} /> 
          </View>
        </SafeAreaView>
      </View>

      {/* Main Scrollable Area */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Image & Name - Now inside ScrollView so it moves with content */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://i.pravatar.cc/300" }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraBadge}>
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Sophia Patel</Text>
          <Text style={styles.userEmail}>sophiapatel@gmail.com</Text>
        </View>

        <Text style={styles.sectionLabel}>Personal Information</Text>
        <View style={styles.infoCard}>
          <InfoItem label="Full Name" value="Sophia Patel" icon="person-outline" />
          <InfoItem label="Email" value="sophiapatel@gmail.com" icon="mail-outline" />
          <InfoItem 
            label="Address" 
            value="123 Main St Apartment 4A, NY" 
            icon="location-outline" 
          />
        </View>

        <Text style={styles.sectionLabel}>Account Settings</Text>
        <View style={styles.infoCard}>
          <MenuItem label="Payment Details" icon="card-outline" />
          <MenuItem 
            label="Order History" 
            icon="receipt-outline" 
            onPress={() => router.push("/shop")} 
          />
          <MenuItem label="Notification Settings" icon="notifications-outline" />
          <MenuItem label="Change Password" icon="lock-closed-outline" />
          <MenuItem label="Privacy Policy" icon="shield-checkmark-outline" />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editText}>Update Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.logoutBtn} 
            onPress={() => router.push("/login/page")}
          >
            <Text style={styles.logoutText}>Log Out</Text>
            <Ionicons name="log-out-outline" size={18} color="#EF2A39" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

/* ---------- Sub-components ---------- */

const InfoItem = ({ label, value, icon }: { label: string; value: string; icon: any }) => (
  <View style={styles.infoItem}>
    <View style={styles.iconCircle}>
      <Ionicons name={icon} size={18} color="#292526" />
    </View>
    <View style={styles.infoTextGroup}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const MenuItem = ({ label, icon, onPress }: { label: string; icon: any; onPress?: () => void }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuLeft}>
      <Ionicons name={icon} size={20} color="#292526" />
      <Text style={styles.menuText}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#CCC" />
  </TouchableOpacity>
);

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  darkHeader: {
    backgroundColor: "#292526",
    paddingBottom: 80, // Space for the profile section to overlap
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: Platform.OS === "ios" ? 0 : 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    marginTop: -70, // Overlap the dark header
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 90,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: "#fff",
  },
  cameraBadge: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#292526",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  userName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#292526",
    marginTop: 10,
  },
  userEmail: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#BBB",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 10,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  infoTextGroup: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#AAA",
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#292526",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  menuText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#292526",
  },
  buttonContainer: {
    marginTop: 10,
    gap: 15,
  },
  editBtn: {
    backgroundColor: "#292526",
    height: 55,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  editText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  logoutBtn: {
    height: 55,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EF2A39",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  logoutText: {
    color: "#EF2A39",
    fontSize: 16,
    fontWeight: "700",
  },
});