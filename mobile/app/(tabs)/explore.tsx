import { Image } from 'expo-image';
import { StyleSheet, Pressable, Button, View } from 'react-native';
import { useState } from 'react';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  const [clickCount, setClickCount] = useState(0); // Contador de cliques
  const [clickPower, setClickPower] = useState(1); // Poder de clique
  const [upgradeCost, setUpgradeCost] = useState(10); // Custo inicial do upgrade
  const [pets, setPets] = useState(0); // Número de pets adquiridos
  const [rebirthCount, setRebirthCount] = useState(0); // Contador de rebirths

  const handleCapivaraClick = () => {
    setClickCount((prev) => prev + clickPower); // Incrementa com base no poder de clique
  };

  const handleUpgrade = () => {
    if (clickCount >= upgradeCost) {
      setClickCount((prev) => prev - upgradeCost); // Paga o custo
      setClickPower((prev) => prev + 1); // Aumenta o poder de clique
      setUpgradeCost((prev) => prev * 2); // Dobra o custo para o próximo upgrade
    }
  };

  const handleBuyPet = () => {
    const petCost = 50 * (pets + 1); // O custo aumenta a cada pet
    if (clickCount >= petCost) {
      setClickCount((prev) => prev - petCost); // Deduz os cliques
      setPets((prev) => prev + 1); // Compra o pet
      setClickPower((prev) => prev + 2); // Aumenta o poder de clique com o pet
    }
  };

  const handleRebirth = () => {
    if (clickCount >= 1000) { // Exemplo de requisito para rebirth
      setClickCount(0); // Zera os cliques
      setClickPower(1); // Zera o poder de clique
      setRebirthCount((prev) => prev + 1); // Incrementa o contador de rebirths
      setUpgradeCost(10); // Restaura o custo inicial de upgrades
      alert('Rebirth realizado com sucesso! Você ganhou um bônus.');
    }
  };

  return (
    <View
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
    >
      {/* Jogo de Clique na Capivara */}
      <ThemedView style={styles.gameContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
            marginBottom: 10,
          }}>
          Jogo da Capivara
        </ThemedText>

        <ThemedText type="subtitle">Clique na capivara!</ThemedText>

        {/* Imagem da capivara clicável */}
        <Pressable onPress={handleCapivaraClick}>
          <Image
            source={require('../../assets/images/capivara.png')} // Imagem da capivara
            style={styles.capivaraImage}
          />
        </Pressable>

        {/* Exibe o contador de cliques e o poder de clique */}
        <ThemedText type="defaultSemiBold">Cliques: {clickCount}</ThemedText>
        <ThemedText type="defaultSemiBold">Poder de clique: {clickPower}</ThemedText>

        {/* Botão de upgrade */}
        <View style={{ marginTop: 20 }}>
          <Button
            title={`Upgrade de poder de clique (Custa ${upgradeCost} cliques)`}
            onPress={handleUpgrade}
            disabled={clickCount < upgradeCost}
          />
        </View>

        {/* Botão para comprar pets */}
        <View style={{ marginTop: 20 }}>
          <Button
            title={`Comprar pet (Custa ${50 * (pets + 1)} cliques)`}
            onPress={handleBuyPet}
            disabled={clickCount < 50 * (pets + 1)}
          />
          <ThemedText type="defaultSemiBold" style={{ marginTop: 10 }}>
            Pets adquiridos: {pets}
          </ThemedText>
        </View>

        {/* Botão de rebirth */}
        <View style={{ marginTop: 20 }}>
          <Button
            title={`Rebirth (Custa 1000 cliques)`}
            onPress={handleRebirth}
            disabled={clickCount < 1000}
          />
          <ThemedText type="defaultSemiBold" style={{ marginTop: 10 }}>
            Rebirths realizados: {rebirthCount}
          </ThemedText>
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  capivaraImage: {
    width: 180,
    height: 180,
    borderRadius: 20,
    marginBottom: 15,
  },
});