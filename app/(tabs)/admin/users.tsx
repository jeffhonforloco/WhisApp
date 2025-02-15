import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, PlatformButton } from '../../../src/components/ui';
import { WebContainer, WebMetaTags } from '../../../src/components/web';

const MOCK_USERS = [
  {
    id: '1',
    username: 'sarah_parker',
    email: 'sarah@example.com',
    role: 'user',
    status: 'active',
    joined: '2025-01-15',
  },
  {
    id: '2',
    username: 'john_doe',
    email: 'john@example.com',
    role: 'moderator',
    status: 'active',
    joined: '2025-01-10',
  },
  {
    id: '3',
    username: 'mike_smith',
    email: 'mike@example.com',
    role: 'user',
    status: 'suspended',
    joined: '2025-01-05',
  },
];

export default function UsersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <WebContainer>
      <WebMetaTags 
        title="User Management - WhisApp Admin"
        description="Manage WhisApp users, roles, and permissions."
      />
      
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="rgba(255,255,255,0.5)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search users..."
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <PlatformButton
            title="Add User"
            onPress={() => {}}
            style={styles.addButton}
          />
        </View>

        <View style={styles.filters}>
          <TouchableOpacity style={[styles.filterChip, styles.activeFilter]}>
            <Text style={styles.filterText}>All Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterText}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterText}>Suspended</Text>
          </TouchableOpacity>
        </View>

        <Card style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.userCell]}>User</Text>
            <Text style={[styles.tableCell, styles.roleCell]}>Role</Text>
            <Text style={[styles.tableCell, styles.statusCell]}>Status</Text>
            <Text style={[styles.tableCell, styles.dateCell]}>Joined</Text>
            <Text style={[styles.tableCell, styles.actionCell]}>Actions</Text>
          </View>

          {MOCK_USERS.map((user) => (
            <View 
              key={user.id} 
              style={[
                styles.tableRow,
                selectedUser === user.id && styles.selectedRow,
              ]}
            >
              <View style={[styles.tableCell, styles.userCell]}>
                <View style={styles.userInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {user.username[0].toUpperCase()}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.username}>{user.username}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                  </View>
                </View>
              </View>
              <Text style={[styles.tableCell, styles.roleCell]}>
                <View style={styles.roleChip}>
                  <Text style={styles.roleText}>{user.role}</Text>
                </View>
              </Text>
              <Text style={[styles.tableCell, styles.statusCell]}>
                <View style={[
                  styles.statusChip,
                  user.status === 'suspended' && styles.suspendedChip,
                ]}>
                  <Text style={styles.statusText}>{user.status}</Text>
                </View>
              </Text>
              <Text style={[styles.tableCell, styles.dateCell]}>
                {user.joined}
              </Text>
              <View style={[styles.tableCell, styles.actionCell]}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => setSelectedUser(user.id)}
                >
                  <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Card>
      </ScrollView>
    </WebContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#fff',
    marginLeft: 8,
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  filterChip: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  activeFilter: {
    backgroundColor: '#FF3B30',
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
  },
  tableCard: {
    margin: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 0,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  selectedRow: {
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  tableCell: {
    color: '#fff',
  },
  userCell: {
    flex: 3,
  },
  roleCell: {
    flex: 1,
  },
  statusCell: {
    flex: 1,
  },
  dateCell: {
    flex: 1,
  },
  actionCell: {
    width: 50,
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  email: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
  roleChip: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  roleText: {
    color: '#fff',
    fontSize: 12,
  },
  statusChip: {
    backgroundColor: '#30D158',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  suspendedChip: {
    backgroundColor: '#FF3B30',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
  actionButton: {
    padding: 8,
  },
});