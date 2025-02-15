import { Stack } from 'expo-router';
import { AdminLayout } from '../../../src/components/layout';

export default function AdminTabLayout() {
  return (
    <AdminLayout>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen 
          name="users" 
          options={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'User Management',
          }}
        />
        <Stack.Screen 
          name="content" 
          options={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Content Moderation',
          }}
        />
        <Stack.Screen 
          name="analytics" 
          options={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Analytics',
          }}
        />
      </Stack>
    </AdminLayout>
  );
}