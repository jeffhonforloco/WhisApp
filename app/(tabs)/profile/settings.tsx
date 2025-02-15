import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Button } from '../../../src/components/ui';

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Card>
          <Button
            title="Privacy Settings"
            variant="outline"
            onPress={() => {}}
          />
          <Button
            title="Notification Preferences"
            variant="outline"
            onPress={() => {}}
            style={styles.button}
          />
          <Button
            title="Account Security"
            variant="outline"
            onPress={() => {}}
            style={styles.button}
          />
        </Card>
      </View>

      <View style={styles.section}>
        <Card>
          <Button
            title="Help & Support"
            variant="outline"
            onPress={() => {}}
          />
          <Button
            title="Terms of Service"
            variant="outline"
            onPress={() => {}}
            style={styles.button}
          />
          <Button
            title="Privacy Policy"
            variant="outline"
            onPress={() => {}}
            style={styles.button}
          />
        </Card>
      </View>

      <View style={styles.section}>
        <Card>
          <Button
            title="Delete Account"
            variant="outline"
            onPress={() => {}}
            textStyle={styles.deleteText}
          />
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  section: {
    padding: 20,
  },
  button: {
    marginTop: 12,
  },
  deleteText: {
    color: '#FF3B30',
  },
});