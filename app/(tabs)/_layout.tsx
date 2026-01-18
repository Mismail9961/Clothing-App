import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.container}>
              <View style={[styles.iconWrapper, focused && styles.activeCircle]}>
                <MaterialCommunityIcons
                  name="home-variant"
                  size={26}
                  color={focused ? "#FFFFFF" : "#8E8E93"}
                />
              </View>
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="shop"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.container}>
              <View style={[styles.iconWrapper, focused && styles.activeCircle]}>
                <Ionicons
                  name="bag-outline"
                  size={24}
                  color={focused ? "#FFFFFF" : "#8E8E93"}
                />
                <View style={styles.badge} />
              </View>
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />



      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.container}>
              <View style={[styles.iconWrapper, focused && styles.activeCircle]}>
                <FontAwesome
                  name="user-o"
                  size={22}
                  color={focused ? "#FFFFFF" : "#8E8E93"}
                />
              </View>
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#1A1A1A",
    height: 75, // Reduced from 85 to match the smaller container
    borderTopWidth: 0,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 15,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30, // Decreased as requested
    top: 15,     // Adjusted to center the smaller container vertically
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
  },
  activeCircle: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    marginTop: 4,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#FF4B55',
    borderWidth: 1.5,
    borderColor: '#1A1A1A',
  },
});