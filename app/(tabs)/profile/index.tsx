import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../src/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '../../../src/store';
import { updateProfile } from '../../../src/store/slices/profileSlice';
import { Card, Input, Button } from '../../../src/components/ui';

export default function ProfileScreen() {
  const { session, signOut } = useAuth();
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: profile?.username || '',
    full_name: profile?.full_name || '',
  });

  const handleUpdateProfile = async () => {
    try {
      if (!session?.user) return;

      await dispatch(updateProfile({
        id: session.user.id,
        updates: formData,
      })).unwrap();

      setIsEditing(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={styles.headerGradient}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Ionicons 
              name={isEditing ? 'close' : 'create-outline'} 
              size={24} 
              color="#fff" 
            />
          </TouchableOpacity>
        </View>

        <Card variant="elevated" style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ 
                uri: profile?.avatar_url || 
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
              }}
              style={styles.avatar}
            />
            {isEditing && (
              <TouchableOpacity style={styles.editAvatarButton}>
                <Ionicons name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>

          {isEditing ? (
            <View style={styles.form}>
              <Input
                label="Username"
                value={formData.username}
                onChangeText={(text) => setFormData(prev => ({ ...prev, username: text }))}
                autoCapitalize="none"
              />
              <Input
                label="Full Name"
                value={formData.full_name || ''}
                onChangeText={(text) => setFormData(prev => ({ ...prev, full_name: text }))}
              />
              <Button
                title="Save Changes"
                onPress={handleUpdateProfile}
                style={styles.saveButton}
              />
            </View>
          ) : (
            <View style={styles.info}>
              <Text style={styles.name}>{profile?.full_name || 'Add your name'}</Text>
              <Text style={styles.username}>@{profile?.username || 'username'}</Text>
              <Text style={styles.joinDate}>
                Joined {new Date(profile?.created_at || Date.now()).toLocaleDateString()}
              </Text>
            </View>
          )}
        </Card>

        <View style={styles.statsContainer}>
          <Card style={styles.statsCard}>
            <Text style={styles.statsValue}>42</Text>
            <Text style={styles.statsLabel}>Whispers</Text>
          </Card>
          <Card style={styles.statsCard}>
            <Text style={styles.statsValue}>128</Text>
            <Text style={styles.statsLabel}>Followers</Text>
          </Card>
          <Card style={styles.statsCard}>
            <Text style={styles.statsValue}>96</Text>
            <Text style={styles.statsLabel}>Following</Text>
          </Card>
        </View>

        <Card>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
            <Text style={styles.settingsButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 200,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileCard: {
    margin: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FF3B30',
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#FF3B30',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  username: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    marginBottom: 8,
  },
  joinDate: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
  },
  form: {
    width: '100%',
  },
  saveButton: {
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsCard: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  statsValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  statsLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  settingsButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    marginLeft: 12,
  },
});