import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';

const API = 'http://SEU_IP:3000'; // MUITO IMPORTANTE

export default function App() {
  const [cookies, setCookies] = useState(0);
  const [autoClickers, setAutoClickers] = useState(0);

  const loadGame = async () => {
    const res = await axios.get(`${API}/game`);
    setCookies(res.data.cookies);
    setAutoClickers(res.data.autoClickers);
  };

  const clickCookie = async () => {
    const res = await axios.post(`${API}/click`);
    setCookies(res.data.cookies);
  };

  const buyUpgrade = async () => {
    const res = await axios.post(`${API}/buy`);
    setCookies(res.data.cookies);
    setAutoClickers(res.data.autoClickers);
  };

  useEffect(() => {
    loadGame();
  }, []);

  return (
    <View>
      <Text>Cookies: {cookies}</Text>
      <Text>Auto: {autoClickers}</Text>

      <TouchableOpacity onPress={clickCookie}>
        <Text>Clicar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={buyUpgrade}>
        <Text>Comprar Auto (10)</Text>
      </TouchableOpacity>
    </View>
  );
}