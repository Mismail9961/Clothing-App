import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");

export default function ProductPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState("#4A4A4A");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["#8E8E8E", "#4A4A4A", "#111111"];

  // Fix for the TypeScript Navigation Error
  const handleNavigation = (path: string) => {
    router.push(path as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          {/* Header Image Section */}
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800" }} 
              style={styles.mainImage}
            />
            
            {/* Navigation Overlay */}
            <View style={styles.headerOverlay}>
              <TouchableOpacity 
                style={styles.iconCircle} 
                onPress={() => router.back()}
                activeOpacity={0.7}
              >
                <Ionicons name="chevron-back" size={22} color="#1A1A1A" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.iconCircle} 
                onPress={() => setIsFavorite(!isFavorite)}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={isFavorite ? "heart" : "heart-outline"} 
                  size={22} 
                  color={isFavorite ? "#EF2A39" : "#1A1A1A"} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Details Content */}
          <View style={styles.detailsContainer}>
            <View style={styles.mainHeaderRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.productTitle}>Light Dress Bless</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>5.0</Text>
                  <Text style={styles.reviewText}>(7,932 reviews)</Text>
                </View>
              </View>

              {/* Responsive Counter */}
              <View style={styles.counterGroup}>
                <TouchableOpacity 
                  onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                  style={styles.counterAction}
                >
                  <Ionicons name="remove" size={18} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.quantityNumber}>{quantity}</Text>
                <TouchableOpacity 
                  onPress={() => setQuantity(quantity + 1)}
                  style={styles.counterAction}
                >
                  <Ionicons name="add" size={18} color="#1A1A1A" />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.descriptionText}>
              Its simple and elegant shape makes it perfect for those of you who want a minimalist 
              yet sophisticated look. <Text style={styles.readMoreLink}>Read More...</Text>
            </Text>

            {/* Selection Grid */}
            <View style={styles.selectionGrid}>
              <View style={styles.selectionBox}>
                <Text style={styles.selectionLabel}>Choose Size</Text>
                <View style={styles.pillRow}>
                  {sizes.map((size) => (
                    <TouchableOpacity
                      key={size}
                      onPress={() => setSelectedSize(size)}
                      style={[
                        styles.sizePill,
                        selectedSize === size && styles.activePill,
                      ]}
                    >
                      <Text style={[
                        styles.sizeLabel,
                        selectedSize === size && styles.activeLabel
                      ]}>{size}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={[styles.selectionBox, { alignItems: 'flex-end' }]}>
                <Text style={styles.selectionLabel}>Color</Text>
                <View style={styles.pillRow}>
                  {colors.map((color) => (
                    <TouchableOpacity
                      key={color}
                      onPress={() => setSelectedColor(color)}
                      style={[
                        styles.colorRing,
                        selectedColor === color && { borderColor: color }
                      ]}
                    >
                      <View style={[styles.colorCore, { backgroundColor: color }]} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Dynamic Footer Button */}
        <View style={styles.bottomActions}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => handleNavigation("/payment/page")}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="bag-handle-outline" size={20} color="#FFF" />
              <Text style={styles.buttonMainText}>Add to Cart  |</Text>
              <Text style={styles.priceTag}>$100.99</Text>
              <Text style={styles.strikePrice}>$190.99</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1 },
  
  // Image Section
  imageWrapper: {
    width: '100%',
    aspectRatio: 0.9, // Makes it responsive regardless of screen height
    backgroundColor: '#F5F5F5',
  },
  mainImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  headerOverlay: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 10 : 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
      android: { elevation: 3 },
    }),
  },

  // Details Section
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -30,
    backgroundColor: '#FFF',
  },
  mainHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111',
    letterSpacing: -0.5,
  },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  ratingText: { fontSize: 14, fontWeight: '700', marginLeft: 4, color: '#111' },
  reviewText: { fontSize: 14, color: '#999', marginLeft: 4 },

  // Responsive Counter
  counterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 100,
    padding: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  counterAction: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityNumber: { paddingHorizontal: 12, fontSize: 16, fontWeight: '700' },

  descriptionText: {
    fontSize: 15,
    color: '#777',
    lineHeight: 24,
    marginBottom: 24,
  },
  readMoreLink: { color: '#111', fontWeight: '700' },

  // Selection UI
  selectionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  selectionBox: { flex: 1 },
  selectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
  },
  pillRow: { flexDirection: 'row', gap: 8 },
  sizePill: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activePill: { backgroundColor: '#111', borderColor: '#111' },
  sizeLabel: { fontSize: 14, fontWeight: '600', color: '#888' },
  activeLabel: { color: '#FFF' },

  colorRing: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorCore: { width: 24, height: 24, borderRadius: 12 },

  // Footer Section
  bottomActions: {
    padding: 20,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  primaryButton: {
    backgroundColor: '#111',
    height: 64,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonMainText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
    marginRight: 8,
  },
  priceTag: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  strikePrice: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
});