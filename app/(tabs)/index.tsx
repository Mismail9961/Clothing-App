import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import useRouter

const { width } = Dimensions.get("window");

export default function FashionApp() {
  const router = useRouter(); // Initialize router
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [favorites, setFavorites] = useState<Set<number>>(new Set([1, 4]));

  const categories = [
    { name: "All Items", icon: "grid-outline" },
    { name: "Dress", icon: "accessibility-outline" },
    { name: "T-Shirt", icon: "shirt-outline" },
    { name: "Jeans", icon: "infinite-outline" },
  ];

  const productItems = [
    { id: 1, name: "Modern Light Clothes", type: "T-Shirt", price: "$212.99", rating: "5.0", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400" },
    { id: 2, name: "Light Dress Bless", type: "Dress modern", price: "$162.99", rating: "5.0", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400" },
    { id: 3, name: "Winter Beanie Look", type: "Accessories", price: "$45.00", rating: "4.8", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400" },
    { id: 4, name: "Casual Soft Tone", type: "Basic", price: "$89.99", rating: "5.0", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
  ];

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  // Navigation handler
  const handleProductPress = (id: number) => {
    router.push(`/products/${id}` as any);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Hello, Welcome 👋</Text>
            <Text style={styles.userName}>Albert Stevano</Text>
          </View>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
            style={styles.profileImage} 
          />
        </View>

        {/* Search Bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#C4C4C4" />
            <TextInput 
              placeholder="Search clothes..." 
              placeholderTextColor="#C4C4C4" 
              style={styles.searchInput} 
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialCommunityIcons name="filter-variant" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList} contentContainerStyle={{ paddingLeft: 16 }}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.name}
              onPress={() => setSelectedCategory(cat.name)}
              style={[styles.categoryButton, selectedCategory === cat.name && styles.categoryButtonActive]}
            >
               {cat.name === "All Items" ? (
                 <Ionicons name="grid" size={16} color={selectedCategory === cat.name ? "#fff" : "#333"} style={{marginRight: 6}} />
               ) : (
                 <MaterialCommunityIcons name={cat.name === "Dress" ? "human-female-girl" : "tshirt-crew-outline"} size={16} color={selectedCategory === cat.name ? "#fff" : "#333"} style={{marginRight: 6}} />
               )}
              <Text style={[styles.categoryText, selectedCategory === cat.name && styles.categoryTextActive]}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Product Grid */}
        <View style={styles.productGrid}>
          {productItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.productCard}
              activeOpacity={0.8}
              onPress={() => handleProductPress(item.id)} // Click triggers navigation
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <TouchableOpacity 
                  style={styles.heartButton} 
                  onPress={(e) => {
                    e.stopPropagation(); // Prevents clicking the heart from opening the product
                    toggleFavorite(item.id);
                  }}
                >
                  <Ionicons 
                    name={favorites.has(item.id) ? "heart" : "heart-outline"} 
                    size={20} 
                    color={favorites.has(item.id) ? "#fff" : "#333"} 
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.productInfo}>
                <Text numberOfLines={1} style={styles.productTitle}>{item.name}</Text>
                <Text style={styles.productType}>{item.type}</Text>
                
                <View style={styles.priceRow}>
                  <Text style={styles.price}>{item.price}</Text>
                  <View style={styles.ratingBox}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { paddingBottom: 100 },
  header: { paddingHorizontal: 20, paddingTop: 60, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  welcomeText: { fontSize: 14, color: "#888" },
  userName: { fontSize: 20, fontWeight: "bold", color: "#1A1A1A" },
  profileImage: { width: 45, height: 45, borderRadius: 22.5 },
  searchRow: { flexDirection: "row", paddingHorizontal: 20, gap: 12, marginBottom: 20 },
  searchContainer: { flex: 1, flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#F0F0F0", borderRadius: 12, paddingHorizontal: 12, height: 50 },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14 },
  filterButton: { backgroundColor: "#2A2A2A", width: 50, height: 50, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  categoryList: { marginBottom: 20, maxHeight: 45 },
  categoryButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: '#F0F0F0', marginRight: 10, backgroundColor: '#fff' },
  categoryButtonActive: { backgroundColor: "#2A2A2A", borderColor: "#2A2A2A" },
  categoryText: { color: "#333", fontWeight: "500" },
  categoryTextActive: { color: "#fff" },
  productGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16, justifyContent: 'space-between' },
  productCard: { width: (width - 48) / 2, marginBottom: 24 },
  imageContainer: { width: '100%', height: 220, borderRadius: 20, overflow: 'hidden', position: 'relative' },
  productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  heartButton: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(255,255,255,0.4)', width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  productInfo: { marginTop: 10 },
  productTitle: { fontSize: 16, fontWeight: "bold", color: "#1A1A1A" },
  productType: { fontSize: 12, color: "#888", marginVertical: 4 },
  priceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 },
  price: { fontSize: 16, fontWeight: "bold", color: "#1A1A1A" },
  ratingBox: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 12, color: "#888" },
});