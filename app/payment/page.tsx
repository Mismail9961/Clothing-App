import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

/* ---------- Types ---------- */

interface CartItem {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
  quantity: number;
}

/* ---------- Screen ---------- */

export default function CheckoutScreen() {
  const router = useRouter();
  
  // State for items (matching image_e64f64.png)
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Modern light clothes",
      type: "Dress modern",
      price: 212.99,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
      quantity: 4,
    },
    {
      id: 2,
      name: "Modern light clothes",
      type: "Dress modern",
      price: 162.99,
      image: "https://images.unsplash.com/photo-1539109132314-3477524c859c?w=400",
      quantity: 1,
    },
  ]);

  const updateQty = (id: number, delta: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerCircle} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color="#111" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <TouchableOpacity style={styles.headerCircle}>
            <MaterialCommunityIcons name="equalizer-outline" size={22} color="#111" style={{ transform: [{ rotate: '90deg' }] }} />
          </TouchableOpacity>
        </View>

        <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={styles.scrollContent}
        >
          {/* Cart Items List */}
          {items.map((item) => (
            <View key={item.id} style={styles.cartCard}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <TouchableOpacity>
                    <Ionicons name="ellipsis-horizontal" size={18} color="#999" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemType}>{item.type}</Text>
                
                <View style={styles.itemFooterRow}>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  <View style={styles.qtyContainer}>
                    <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={styles.qtyBtn}>
                      <Ionicons name="remove" size={16} color="#111" />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={styles.qtyBtn}>
                      <Ionicons name="add" size={16} color="#111" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}

          {/* Shipping Information Section */}
          <Text style={styles.sectionTitle}>Shipping Information</Text>
          <TouchableOpacity style={styles.shippingCard}>
            <View style={styles.visaContainer}>
                <Image 
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png' }} 
                    style={styles.visaLogo}
                />
            </View>
            <Text style={styles.cardNumber}>**** **** **** 2143</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>

          {/* Summary Table */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total ({totalItems} items)</Text>
              <Text style={styles.summaryValue}>${totalAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping Fee</Text>
              <Text style={styles.summaryValue}>$0.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={styles.summaryValue}>$0.00</Text>
            </View>
            
            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.subTotalLabel}>Sub Total</Text>
              <Text style={styles.subTotalValue}>${totalAmount.toFixed(2)}</Text>
            </View>
          </View>

          {/* FINAL PLACE ORDER BUTTON */}
          <TouchableOpacity 
            style={styles.placeOrderButton}
            onPress={() => router.push("/success/page" as any)}
            activeOpacity={0.8}
          >
            <Text style={styles.placeOrderText}>Place Order</Text>
            <View style={styles.arrowCircle}>
               <Ionicons name="arrow-forward" size={18} color="#111" />
            </View>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 40,
    paddingBottom: 20,
  },
  headerCircle: {
    width: 45,
    height: 45,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#111" },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 120 },
  
  // Item Card
  cartCard: {
    flexDirection: 'row',
    marginBottom: 25,
    alignItems: 'center',
  },
  itemImage: {
    width: 85,
    height: 85,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
  },
  itemInfo: { flex: 1, marginLeft: 15 },
  itemHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { fontSize: 16, fontWeight: '700', color: '#111' },
  itemType: { fontSize: 13, color: '#999', marginTop: 4 },
  itemFooterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  itemPrice: { fontSize: 16, fontWeight: '800', color: '#111' },
  
  // Qty Control
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    padding: 2,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  qtyText: { marginHorizontal: 10, fontSize: 14, fontWeight: '700' },

  // Shipping
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111', marginTop: 10, marginBottom: 15 },
  shippingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 15,
    padding: 15,
    marginBottom: 30,
  },
  visaContainer: {
    backgroundColor: '#2D4E9E',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
  },
  visaLogo: { width: 35, height: 12, tintColor: '#FFF', resizeMode: 'contain' },
  cardNumber: { flex: 1, marginLeft: 15, fontSize: 15, color: '#111', fontWeight: '500' },

  // Summary
  summaryContainer: { marginTop: 10, marginBottom: 30 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryLabel: { fontSize: 15, color: '#999' },
  summaryValue: { fontSize: 15, fontWeight: '700', color: '#111' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 15 },
  subTotalLabel: { fontSize: 18, color: '#111', fontWeight: '500' },
  subTotalValue: { fontSize: 18, fontWeight: '800', color: '#111' },

  // Place Order Button
  placeOrderButton: {
    backgroundColor: '#111',
    height: 60,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    ...Platform.select({
        ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5 },
        android: { elevation: 5 },
    }),
  },
  placeOrderText: { color: '#FFF', fontSize: 16, fontWeight: '700', marginRight: 10 },
  arrowCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Floating Tab Bar
  tabBar: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    height: 75,
    backgroundColor: '#222',
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  tabItem: { alignItems: 'center', justifyContent: 'center' },
  activeTabCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIndicator: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#FFF', marginTop: 4 },
  shoppingBag: { position: 'relative' },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF2A39',
    borderWidth: 1.5,
    borderColor: '#222',
  }
});