import { StyleSheet, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useAppSelector } from '../../store';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { session } = useAuth();
  const { profile } = useAppSelector((state) => state.profile);

  // Check if user has admin role
  const isAdmin = profile?.role === 'admin';

  if (!session || !isAdmin) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Access Denied</Text>
      </View>
    );
  }

  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});