import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { isIOS, isAndroid, isWeb } from '../../../src/platform';
import { HapticButton } from '../../../src/platform/ios/components/HapticButton';
import { BlurredModal } from '../../../src/platform/ios/components/BlurredModal';
import { MaterialButton } from '../../../src/platform/android/components/MaterialButton';
import { BottomSheetMenu } from '../../../src/platform/android/components/BottomSheetMenu';
import { WebButton } from '../../../src/platform/web/components/WebButton';
import { WebModal } from '../../../src/platform/web/components/WebModal';
import { Card } from '../../../src/components/ui';

export default function ExamplesScreen() {
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [showAndroidMenu, setShowAndroidMenu] = useState(false);
  const [showWebModal, setShowWebModal] = useState(false);

  const menuItems = [
    {
      id: '1',
      label: 'Share',
      onPress: () => console.log('Share pressed'),
    },
    {
      id: '2',
      label: 'Edit',
      onPress: () => console.log('Edit pressed'),
    },
    {
      id: '3',
      label: 'Delete',
      onPress: () => console.log('Delete pressed'),
      destructive: true,
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={styles.headerGradient}
      />

      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Component Examples</Text>
          <Text style={styles.subtitle}>Platform-specific UI components</Text>
        </View>

        {/* iOS Components */}
        {isIOS && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>iOS Components</Text>
            
            <Card style={styles.card}>
              <Text style={styles.cardTitle}>HapticButton</Text>
              <View style={styles.row}>
                <HapticButton
                  hapticStyle="light"
                  onPress={() => {}}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Light</Text>
                </HapticButton>
                
                <HapticButton
                  hapticStyle="medium"
                  onPress={() => {}}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Medium</Text>
                </HapticButton>
                
                <HapticButton
                  hapticStyle="heavy"
                  onPress={() => {}}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Heavy</Text>
                </HapticButton>
              </View>
            </Card>

            <Card style={styles.card}>
              <Text style={styles.cardTitle}>BlurredModal</Text>
              <HapticButton
                onPress={() => setShowIOSModal(true)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Show Modal</Text>
              </HapticButton>
            </Card>

            <BlurredModal
              visible={showIOSModal}
              onClose={() => setShowIOSModal(false)}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Blurred Modal</Text>
                <Text style={styles.modalText}>
                  This is a native iOS-style modal with blur effect.
                </Text>
                <HapticButton
                  onPress={() => setShowIOSModal(false)}
                  style={styles.modalButton}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </HapticButton>
              </View>
            </BlurredModal>
          </View>
        )}

        {/* Android Components */}
        {isAndroid && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Android Components</Text>
            
            <Card style={styles.card}>
              <Text style={styles.cardTitle}>MaterialButton</Text>
              <View style={styles.row}>
                <MaterialButton
                  title="Contained"
                  onPress={() => {}}
                  style={styles.materialButton}
                />
                
                <MaterialButton
                  title="Outlined"
                  variant="outlined"
                  onPress={() => {}}
                  style={styles.materialButton}
                />
                
                <MaterialButton
                  title="Text"
                  variant="text"
                  onPress={() => {}}
                  style={styles.materialButton}
                />
              </View>
            </Card>

            <Card style={styles.card}>
              <Text style={styles.cardTitle}>BottomSheetMenu</Text>
              <MaterialButton
                title="Show Menu"
                onPress={() => setShowAndroidMenu(true)}
              />
            </Card>

            <BottomSheetMenu
              visible={showAndroidMenu}
              onClose={() => setShowAndroidMenu(false)}
              items={menuItems}
              title="Actions"
            />
          </View>
        )}

        {/* Web Components */}
        {isWeb && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Web Components</Text>
            
            <Card style={styles.card}>
              <Text style={styles.cardTitle}>WebButton</Text>
              <View style={styles.row}>
                <WebButton
                  title="Primary"
                  onPress={() => {}}
                  style={styles.webButton}
                />
                
                <WebButton
                  title="Secondary"
                  variant="secondary"
                  onPress={() => {}}
                  style={styles.webButton}
                />
                
                <WebButton
                  title="Outline"
                  variant="outline"
                  onPress={() => {}}
                  style={styles.webButton}
                />
              </View>

              <View style={[styles.row, styles.marginTop]}>
                <WebButton
                  title="Small"
                  size="small"
                  onPress={() => {}}
                  style={styles.webButton}
                />
                
                <WebButton
                  title="Medium"
                  size="medium"
                  onPress={() => {}}
                  style={styles.webButton}
                />
                
                <WebButton
                  title="Large"
                  size="large"
                  onPress={() => {}}
                  style={styles.webButton}
                />
              </View>
            </Card>

            <Card style={styles.card}>
              <Text style={styles.cardTitle}>WebModal</Text>
              <WebButton
                title="Show Modal"
                onPress={() => setShowWebModal(true)}
              />
            </Card>

            <WebModal
              visible={showWebModal}
              onClose={() => setShowWebModal(false)}
              title="Web Modal"
            >
              <Text style={styles.modalText}>
                This is a web-optimized modal dialog with animations and backdrop.
              </Text>
              <WebButton
                title="Close"
                onPress={() => setShowWebModal(false)}
                style={styles.marginTop}
              />
            </WebModal>
          </View>
        )}
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
    paddingTop: 60,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 8,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  marginTop: {
    marginTop: 12,
  },
  button: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  materialButton: {
    flex: 1,
  },
  webButton: {
    flex: 1,
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
});