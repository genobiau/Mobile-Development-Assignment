import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="search-incidents" options={{ headerShown: false }} />
      <Stack.Screen name="incidents" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen name="saved-incidents" options={{ headerShown: false }} />
    </Stack>
  );
}
