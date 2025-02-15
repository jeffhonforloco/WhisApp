import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../../src/components/ui';
import { WebContainer, WebMetaTags } from '../../../src/components/web';

export default function AnalyticsScreen() {
  return (
    <WebContainer>
      <WebMetaTags 
        title="Analytics - WhisApp Admin"
        description="Track and analyze WhisApp platform performance."
      />
      
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.subtitle}>Platform insights and metrics</Text>
        </View>

        <View style={styles.overviewGrid}>
          <Card style={styles.overviewCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="people" size={24} color="#FF3B30" />
              <Text style={styles.cardTitle}>Users</Text>
            </View>
            <Text style={styles.cardValue}>5,234</Text>
            <Text style={styles.cardTrend}>
              <Ionicons name="arrow-up" size={16} color="#30D158" />
              <Text style={styles.trendPositive}> +12% this week</Text>
            </Text>
          </Card>

          <Card style={styles.overviewCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="mic" size={24} color="#007AFF" />
              <Text style={styles.cardTitle}>Whispers</Text>
            </View>
            <Text style={styles.cardValue}>12,845</Text>
            <Text style={styles.cardTrend}>
              <Ionicons name="arrow-up" size={16} color="#30D158" />
              <Text style={styles.trendPositive}> +8% this week</Text>
            </Text>
          </Card>

          <Card style={styles.overviewCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="heart" size={24} color="#FF2D55" />
              <Text style={styles.cardTitle}>Engagements</Text>
            </View>
            <Text style={styles.cardValue}>45,678</Text>
            <Text style={styles.cardTrend}>
              <Ionicons name="arrow-up" size={16} color="#30D158" />
              <Text style={styles.trendPositive}> +15% this week</Text>
            </Text>
          </Card>

          <Card style={styles.overviewCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="flag" size={24} color="#FF9500" />
              <Text style={styles.cardTitle}>Reports</Text>
            </View>
            <Text style={styles.cardValue}>89</Text>
            <Text style={styles.cardTrend}>
              <Ionicons name="arrow-down" size={16} color="#FF3B30" />
              <Text style={styles.trendNegative}> -5% this week</Text>
            </Text>
          </Card>
        </View>

        <Card style={styles.detailCard}>
          <Text style={styles.sectionTitle}>Top Locations</Text>
          <View style={styles.locationList}>
            {[
              { city: 'Paris', country: 'France', whispers: 1234 },
              { city: 'Tokyo', country: 'Japan', whispers: 987 },
              { city: 'New York', country: 'USA', whispers: 876 },
              { city: 'London', country: 'UK', whispers: 765 },
              { city: 'Sydney', country: 'Australia', whispers: 654 },
            ].map((location, index) => (
              <View key={index} style={styles.locationItem}>
                <View style={styles.locationInfo}>
                  <Text style={styles.locationCity}>{location.city}</Text>
                  <Text style={styles.locationCountry}>{location.country}</Text>
                </View>
                <Text style={styles.locationValue}>
                  {location.whispers.toLocaleString()}
            )
            )
            }
  )
}