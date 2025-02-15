import { useState } from 'react';
import { StyleSheet, View, Text, Image, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { PlatformButton } from '../../src/components/ui';

const ONBOARDING_STEPS = [
  {
    title: 'Share Your Journey',
    description: 'Record and share your travel experiences through voice messages',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
  },
  {
    title: 'Discover Hidden Gems',
    description: 'Find unique places and experiences shared by fellow travelers',
    image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800',
  },
  {
    title: 'Connect with Travelers',
    description: 'Join a community of passionate travelers and share stories',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800',
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const { width } = useWindowDimensions();
  const step = ONBOARDING_STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      router.push('/sign-up');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        key={currentStep}
        entering={FadeIn}
        exiting={FadeOut}
        style={StyleSheet.absoluteFill}
      >
        <Image
          source={{ uri: step.image }}
          style={[StyleSheet.absoluteFill, { width, opacity: 0.5 }]}
        />
      </Animated.View>

      <View style={styles.content}>
        <Animated.View 
          key={`text-${currentStep}`}
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.textContainer}
        >
          <Text style={styles.title}>{step.title}</Text>
          <Text style={styles.description}>{step.description}</Text>
        </Animated.View>

        <View style={styles.footer}>
          <View style={styles.indicators}>
            {ONBOARDING_STEPS.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentStep && styles.activeIndicator,
                ]}
              />
            ))}
          </View>

          <PlatformButton
            title={currentStep === ONBOARDING_STEPS.length - 1 ? "Get Started" : "Next"}
            onPress={handleNext}
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  textContainer: {
    marginTop: 100,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    marginBottom: 50,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#fff',
    width: 20,
  },
  button: {
    padding: 16,
  },
});