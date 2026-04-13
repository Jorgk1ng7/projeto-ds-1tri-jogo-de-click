import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color="gray" />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Jogo',
          tabBarIcon: ({ color }) => <FontAwesome6 name="gamepad" size={24} color="gray" />,
        }}
      />
      <Tabs.Screen
        name="suporti"
        options={{
          title: 'Suporte',
          tabBarIcon: ({ color }) => <MaterialIcons name="support-agent" size={24} color="gray" />,
        }}
      />
    </Tabs>
  );
}
