import { Image } from 'expo-image';
import { StyleSheet, Pressable, View, ScrollView, Animated } from 'react-native';
import { useState } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  const [clickCount, setClickCount] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [rebirthCount, setRebirthCount] = useState(0);

  const [scaleAnim] = useState(new Animated.Value(1));

  const upgrades = [
    { name: 'Upgrade 1', cost: 10, power: 1 },
    { name: 'Upgrade 2', cost: 20, power: 2 },
    { name: 'Upgrade 3', cost: 50, power: 3 },
    { name: 'Upgrade 4', cost: 100, power: 5 },
    { name: 'Upgrade 5', cost: 200, power: 8 },
    { name: 'Upgrade 6', cost: 400, power: 13 },
    { name: 'Upgrade 7', cost: 800, power: 21 },
    { name: 'Upgrade 8', cost: 1600, power: 34 },
    { name: 'Upgrade 9', cost: 3200, power: 55 },
    { name: 'Upgrade 10', cost: 6400, power: 89 },
  ];

  const handleCapivaraClick = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    setClickCount((prev) => prev + clickPower);
  };

  const handleUpgrade = (upgrade) => {
    if (clickCount >= upgrade.cost) {
      setClickCount((prev) => prev - upgrade.cost);
      setClickPower((prev) => prev + upgrade.power);
    }
  };

  const handleRebirth = () => {
    if (clickCount >= 1000) {
      const bonusMultiplier = rebirthCount + 1; // Multiplicador crescente
      setClickCount(0);
      setClickPower(1 * bonusMultiplier); // Reset + bônus do rebirth
      setRebirthCount((prev) => prev + 1);
      alert(`Rebirth realizado! Seu poder de clique inicial agora é ${1 * bonusMultiplier}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.gameContainer}>
        <ThemedText type="title" style={styles.title}>
          Jogo da Capivara
        </ThemedText>

        <ThemedText type="subtitle" style={{ color: '#fff' }}>Clique na capivara!</ThemedText>

        <Pressable onPress={handleCapivaraClick}>
          <Animated.Image
            source={require('../../assets/images/capivara.png')}
            style={[styles.capivaraImage, { transform: [{ scale: scaleAnim }] }]}
          />
        </Pressable>

        <View style={styles.statsContainer}>
          <ThemedText type="defaultSemiBold" style={{ color: '#fff' }}>Cliques: {clickCount}</ThemedText>
          <ThemedText type="defaultSemiBold" style={{ color: '#fff' }}>Poder de clique: {clickPower}</ThemedText>
        </View>

        <View style={styles.upgradesContainer}>
          {upgrades.map((upgrade, index) => (
            <Pressable
              key={index}
              style={[
                styles.upgradeButton,
                clickCount < upgrade.cost && { backgroundColor: '#555' },
              ]}
              onPress={() => handleUpgrade(upgrade)}
              disabled={clickCount < upgrade.cost}
            >
              <ThemedText style={styles.upgradeText}>
                {upgrade.name} (+{upgrade.power}) - {upgrade.cost} cliques
              </ThemedText>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={[
            styles.rebirthButton,
            clickCount < 1000 && { backgroundColor: '#555' },
          ]}
          onPress={handleRebirth}
          disabled={clickCount < 1000}
        >
          <ThemedText style={styles.upgradeText}>Rebirth (1000 cliques)</ThemedText>
        </Pressable>

        <ThemedText type="defaultSemiBold" style={{ marginTop: 10, color: '#fff' }}>
          Rebirths realizados: {rebirthCount}
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: '#000', // Fundo preto
  },
  gameContainer: {
    width: '90%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#1a1a1a', // Card escuro para contraste
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  title: {
    fontFamily: Fonts.rounded,
    marginBottom: 10,
    color: '#fff',
  },
  capivaraImage: {
    width: 180,
    height: 180,
    borderRadius: 20,
    marginVertical: 15,
  },
  statsContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  upgradesContainer: {
    width: '100%',
    marginTop: 20,
  },
  upgradeButton: {
    backgroundColor: '#4db6ac',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginVertical: 5,
    alignItems: 'center',
  },
  rebirthButton: {
    backgroundColor: '#ff8a65',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  upgradeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});