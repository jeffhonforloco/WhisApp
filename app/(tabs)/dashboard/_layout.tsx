import { Stack } from 'expo-router';

export default function DashboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen 
        name="stats" 
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Your Stats',
        }}
      />
      <Stack.Screen 
        name="achievements" 
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Achievements',
        }}
      />
    </Stack>
  );
}