import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

/* ---------- Types ---------- */
type OrderStatus = "Delivered" | "On the way" | "Cancelled";

interface Order {
  id: string;
  date: string;
  total: string;
  status: OrderStatus;
  items: string;
}

export default function OrderHistoryScreen() {
  const navigation = useNavigation();

  // The ScrollView will automatically handle scrolling as this list grows
  const orders: Order[] = [
    {
      id: "ORD-1023",
      date: "12 Sep 2025",
      total: "$24.50",
      status: "Delivered",
      items: "T-Shirt",
    },
    {
      id: "ORD-1018",
      date: "08 Sep 2025",
      total: "$18.20",
      status: "On the way",
      items: "T-Shirt",
    },
    {
      id: "ORD-1009",
      date: "02 Sep 2025",
      total: "$31.00",
      status: "Cancelled",
      items: "T-Shirt, Jeans, Hat",
    },
    {
      id: "ORD-1005",
      date: "28 Aug 2025",
      total: "$12.00",
      status: "Delivered",
      items: "Accessories",
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Fixed Header Section */}
      <View style={styles.headerContainer}>
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Order History</Text>
            <View style={{ width: 44 }} /> 
          </View>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color="#A0A0A0" style={{marginLeft: 12}} />
            <TextInput 
              placeholder="Search past orders..." 
              placeholderTextColor="#A0A0A0"
              style={styles.searchInput}
            />
          </View>
        </SafeAreaView>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollPadding}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <Text style={styles.orderCount}>{orders.length} items</Text>
        </View>
        
        {orders.map((order) => (
          <TouchableOpacity 
            key={order.id} 
            style={styles.orderCard}
            activeOpacity={0.8}
          >
            <View style={styles.cardTop}>
              <View style={styles.idGroup}>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.dateText}>{order.date}</Text>
              </View>
              <StatusBadge status={order.status} />
            </View>

            <View style={styles.divider} />

            <View style={styles.cardBottom}>
              <View style={styles.itemsGroup}>
                <Ionicons name="fast-food-outline" size={16} color="#292526" />
                <Text style={styles.itemText} numberOfLines={1}>
                  {order.items}
                </Text>
              </View>
              <Text style={styles.totalAmount}>{order.total}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

/* ---------- Status Badge ---------- */
const STATUS_THEME: Record<OrderStatus, { bg: string; text: string }> = {
  Delivered: { bg: "#E8F5E9", text: "#2E7D32" },
  "On the way": { bg: "#FFF3E0", text: "#EF6C00" },
  Cancelled: { bg: "#FFEBEE", text: "#C62828" },
};

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const theme = STATUS_THEME[status];
  return (
    <View style={[styles.badge, { backgroundColor: theme.bg }]}>
      <Text style={[styles.badgeText, { color: theme.text }]}>{status}</Text>
    </View>
  );
};

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD", 
  },
  headerContainer: {
    backgroundColor: "#292526",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 25,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 10,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    height: 50,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#292526",
  },
  content: {
    flex: 1,
  },
  scrollPadding: {
    padding: 20,
    paddingBottom: 90, // Extra space at bottom for better scrolling feel
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#292526",
  },
  orderCount: {
    fontSize: 14,
    color: "#A0A0A0",
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F1F1F1",
    ...Platform.select({
      ios: {
        shadowColor: "#292526",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
      },
      android: { elevation: 2 },
    }),
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  idGroup: { flex: 1 },
  orderId: {
    fontSize: 16,
    fontWeight: "700",
    color: "#292526",
  },
  dateText: {
    fontSize: 12,
    color: "#A0A0A0",
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  divider: {
    height: 1,
    backgroundColor: "#F8F8F8",
    marginVertical: 15,
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemsGroup: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  itemText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 8,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "800",
    color: "#292526",
  },
});