import { Image } from 'expo-image';
import { 
  StyleSheet, 
  Pressable, 
  View, 
  Dimensions, 
  Text,
  Vibration,
  FlatList,
  Platform,
  SafeAreaView
} from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withSequence
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function TabTwoScreen() {
  const [clickCount, setClickCount] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [rebirthCount, setRebirthCount] = useState(0);
  const [particles, setParticles] = useState([]);

  const [upgrades, setUpgrades] = useState([
    { id: 1, name: '👆 Dedos I', baseCost: 20, power: 1, level: 0, color: '#3b82f6' },
    { id: 2, name: '✌️ Dedos II', baseCost: 100, power: 2, level: 0, color: '#3b82f6' },
    { id: 3, name: '🤜 Mão Ferro', baseCost: 750, power: 5, level: 0, color: '#ef4444' },
    { id: 4, name: '🤖 Braço Robô', baseCost: 1200, power: 15, level: 0, color: '#10b981' },
    { id: 5, name: '🐹 Cap Amiga', baseCost: 30000, power: 50, level: 0, color: '#f59e0b' },
    { id: 6, name: '⭐ Super Capi', baseCost: 100000, power: 200, level: 0, color: '#8b5cf6' },
  ]);

  const rebirthMultiplier = Math.floor(Math.pow(rebirthCount + 1, 1.5));
  const scaleAnim = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnim.value }]
  }));

  const getUpgradeCost = (u) => Math.floor(u.baseCost * Math.pow(1.15, u.level));

  const buyUpgrade = (upgrade) => {
    const cost = getUpgradeCost(upgrade);
    if (clickCount >= cost) {
      setClickCount(prev => prev - cost);
      setClickPower(prev => prev + upgrade.power);
      setUpgrades(prev => prev.map(u => u.id === upgrade.id ? { ...u, level: u.level + 1 } : u));
      Vibration.vibrate(50);
    }
  };

  const handleCapivaraClick = (event) => {
    scaleAnim.value = withSequence(withSpring(1.2), withSpring(1));
    const gain = clickPower * rebirthMultiplier;
    setClickCount(prev => prev + gain);
    
    // Partícula simples
    const { locationX, locationY } = event.nativeEvent;
    const id = Date.now();
    setParticles(prev => [...prev.slice(-10), { id, x: locationX, y: locationY, val: gain }]);
    setTimeout(() => setParticles(p => p.filter(x => x.id !== id)), 800);
  };

  const renderUpgrade = ({ item }) => {
    const cost = getUpgradeCost(item);
    const canAfford = clickCount >= cost;
    return (
      <Pressable 
        style={[styles.card, { borderColor: item.color, opacity: canAfford ? 1 : 0.6 }]} 
        onPress={() => buyUpgrade(item)}
      >
        <Text style={[styles.cardTitle, { color: item.color }]}>{item.name}</Text>
        <Text style={styles.cardCost}>💰 {cost.toLocaleString()}</Text>
        <Text style={styles.cardLevel}>Nível {item.level}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        
        {/* TOP: Score e Stats */}
        <View style={styles.header}>
          <ThemedText style={styles.scoreText}>💰 {Math.floor(clickCount).toLocaleString()}</ThemedText>
          <Text style={styles.subText}>Poder: {clickPower} | Mult: x{rebirthMultiplier}</Text>
        </View>

        {/* MIDDLE: Área da Capivara (Livre) */}
        <View style={styles.clickZone}>
          {particles.map(p => (
            <Text key={p.id} style={[styles.particle, { left: p.x, top: p.y }]}>+{p.val}</Text>
          ))}
          <Pressable onPress={handleCapivaraClick}>
            <Animated.View style={[styles.capiContainer, animatedStyle]}>
              <Image 
                source={require('../../assets/images/capivara.png')} 
                style={styles.capiImage} 
                contentFit="contain" 
              />
            </Animated.View>
          </Pressable>
        </View>

        {/* BOTTOM: Shop (Altura Controlada) */}
        <View style={styles.shopWrapper}>
          <Text style={styles.shopHeader}>🛒 MELHORIAS</Text>
          <FlatList
            data={upgrades}
            renderItem={renderUpgrade}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.gridRow}
            contentContainerStyle={styles.scrollList}
          />
        </View>

      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  container: { flex: 1 },
  
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#1e293b',
  },
  scoreText: { fontSize: 32, fontWeight: '900', color: '#fbbf24' },
  subText: { color: '#94a3b8', fontWeight: 'bold' },

  clickZone: {
    flex: 1, // Isso faz a capivara usar todo o espaço que sobrar
    justifyContent: 'center',
    alignItems: 'center',
  },
  capiContainer: { width: screenWidth * 0.1, height: screenWidth * 0.1 },
  capiImage: { width: '100%', height: '100%' },
  
  particle: {
    position: 'absolute',
    color: '#fbbf24',
    fontWeight: 'bold',
    fontSize: 20,
    zIndex: 5,
  },

  shopWrapper: {
    height: screenHeight * 0.35, // Ocupa exatamente 35% da altura da tela
    backgroundColor: '#1e293b',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 15,
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  shopHeader: {
    color: '#fff',
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 18,
  },
  scrollList: { paddingBottom: 20 },
  gridRow: { justifyContent: 'space-between', marginBottom: 10 },
  
  card: {
    width: '48%',
    backgroundColor: '#334155',
    borderRadius: 15,
    padding: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  cardTitle: { fontWeight: 'bold', fontSize: 13 },
  cardCost: { color: '#fff', fontSize: 11, marginVertical: 4 },
  cardLevel: { color: '#94a3b8', fontSize: 10 },
});