import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'NSW Traffic Incidents Search Homepage' }}
      />
      <Stack.Screen
        name="search-incidents"
        options={{ title: 'Search NSW Traffic Incidents', headerShown: true }}
      />
      <Stack.Screen
        name="incidents"
        options={{ title: 'View All Incidents', headerShown: true }}
      />
      <Stack.Screen
        name="[id]"
        options={{ title: 'View My Incidents', headerShown: true }}
      />
      <Stack.Screen
        name="saved-incidents"
        options={{ title: 'View All Saved Incidents', headerShown: true }}
      />
    </Stack>
  );
}
