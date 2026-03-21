import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  fetchHistoricalNSWIncidents,
  fetchNSWIncidents,
} from '../../../services/nswTrafficAPI';

interface SavedIncident {
  id: string;
  region: string;
  incidentType: string;
  streetName: string;
  date: string;
}

interface DetailedIncident {
  id: string;
  region: string;
  incidentType: string;
  streetName: string;
  date: string;
  headline: string;
  adviceA: string;
  mainCategory: string;
  mainStreet: string;
  crossStreet: string;
  affectedDirection: string;
}

export default function IncidentDetailsPage() {
  const router = useRouter();

  const { id, source } = useLocalSearchParams<{
    id?: string;
    source?: string;
  }>();

  const [incident, setIncident] = useState<DetailedIncident | null>(null);
  const [loading, setLoading] = useState(true);

  const mapRegionCode = (regionCode: string) => {
    switch (regionCode) {
      case 'SYD_MET':
        return 'Sydney';
      case 'NTH_NSW':
        return 'Northern NSW';
      case 'STH_NSW':
        return 'Southern NSW';
      case 'WST_NSW':
        return 'Western NSW';
      default:
        return regionCode || 'Unknown Region';
    }
  };

  const getRawTimestamp = (rawDate: any): number | null => {
    if (!rawDate) return null;

    const numericValue = Number(rawDate);
    if (!isNaN(numericValue)) return numericValue;

    const parsedDate = new Date(rawDate);
    if (!isNaN(parsedDate.getTime())) return parsedDate.getTime();

    return null;
  };

  const formatDate = (rawDate: any): string => {
    const timestamp = getRawTimestamp(rawDate);
    if (timestamp === null) return 'Unknown Date';
    return new Date(timestamp).toLocaleString();
  };

  const loadSavedIncident = async (): Promise<SavedIncident | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem('savedIncidents');
      const savedItems: SavedIncident[] = jsonValue
        ? JSON.parse(jsonValue)
        : [];

      return savedItems.find((item) => String(item.id) === String(id)) || null;
    } catch (error) {
      console.log('Error loading saved incident:', error);
      return null;
    }
  };

  const findHazardById = (data: any, targetId: string) => {
    const results = data?.result || [];

    return results.find((entry: any) => {
      const feature = entry?.Hazards?.features;
      return String(feature?.id) === String(targetId);
    });
  };

  const buildDetailedIncidentFromHazard = (
    matchedItem: any,
    savedIncident: SavedIncident | null,
  ): DetailedIncident => {
    const feature = matchedItem?.Hazards?.features || {};
    const properties = feature?.properties || {};
    const firstRoad = properties?.roads?.[0] || {};
    const firstLane = firstRoad?.impactedLanes?.[0] || {};

    return {
      id: String(feature?.id || savedIncident?.id || id || ''),
      region: String(
        savedIncident?.region ||
          mapRegionCode(firstRoad?.region || '') ||
          firstRoad?.suburb ||
          'Unknown Region',
      ),
      incidentType: String(
        savedIncident?.incidentType ||
          properties?.displayName ||
          properties?.headline ||
          properties?.mainCategory ||
          'Unknown Incident',
      ),
      streetName: String(
        savedIncident?.streetName || firstRoad?.mainStreet || 'Unknown Street',
      ),
      date:
        savedIncident?.date ||
        formatDate(properties?.created || properties?.lastUpdated || null),
      headline: String(properties?.headline || 'No headline available'),
      adviceA: String(properties?.adviceA || 'No advice available'),
      mainCategory: String(
        properties?.mainCategory || 'No main category available',
      ),
      mainStreet: String(
        firstRoad?.mainStreet ||
          savedIncident?.streetName ||
          'No main street available',
      ),
      crossStreet: String(
        firstRoad?.crossStreet || 'No cross street available',
      ),
      affectedDirection: String(
        firstLane?.affectedDirection || 'No affected direction available',
      ),
    };
  };

  const loadIncident = async () => {
    try {
      setLoading(true);

      let savedIncident: SavedIncident | null = null;

      if (source === 'saved') {
        savedIncident = await loadSavedIncident();
      }

      try {
        const liveData = await fetchNSWIncidents();
        const liveMatch = findHazardById(liveData, String(id));

        if (liveMatch) {
          setIncident(
            buildDetailedIncidentFromHazard(liveMatch, savedIncident),
          );
          return;
        }
      } catch (error) {
        console.log('Live incident lookup failed:', error);
      }

      try {
        const historicalData = await fetchHistoricalNSWIncidents();
        const historicalMatch = findHazardById(historicalData, String(id));

        if (historicalMatch) {
          setIncident(
            buildDetailedIncidentFromHazard(historicalMatch, savedIncident),
          );
          return;
        }
      } catch (error) {
        console.log('Historical incident lookup failed:', error);
      }

      if (savedIncident) {
        setIncident({
          id: savedIncident.id,
          region: savedIncident.region,
          incidentType: savedIncident.incidentType,
          streetName: savedIncident.streetName,
          date: savedIncident.date,
          headline: 'No headline available',
          adviceA: 'No advice available',
          mainCategory: 'No main category available',
          mainStreet: savedIncident.streetName,
          crossStreet: 'No cross street available',
          affectedDirection: 'No affected direction available',
        });
        return;
      }

      setIncident(null);
    } catch (error) {
      console.log('Error loading incident details:', error);
      setIncident(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncident();
  }, [id, source]);

  const goBackPage = () => {
    if (source === 'saved') {
      router.push('/home/saved-incidents');
    } else {
      router.back();
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={true}
    >
      {loading ? (
        <Text style={styles.text}>Loading incident details...</Text>
      ) : !incident ? (
        <Text style={styles.text}>Incident not found.</Text>
      ) : (
        <>
          <Text style={styles.title}>{incident.incidentType}</Text>

          <View style={styles.card}>
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.text}>{incident.id}</Text>

            <Text style={styles.label}>Region:</Text>
            <Text style={styles.text}>{incident.region}</Text>

            <Text style={styles.label}>Street Name:</Text>
            <Text style={styles.text}>{incident.streetName}</Text>

            <Text style={styles.label}>Date:</Text>
            <Text style={styles.text}>{incident.date}</Text>

            <Text style={styles.label}>Headline:</Text>
            <Text style={styles.text}>{incident.headline}</Text>

            <Text style={styles.label}>Advice A:</Text>
            <Text style={styles.text}>{incident.adviceA}</Text>

            <Text style={styles.label}>Main Category:</Text>
            <Text style={styles.text}>{incident.mainCategory}</Text>

            <Text style={styles.label}>Main Street:</Text>
            <Text style={styles.text}>{incident.mainStreet}</Text>

            <Text style={styles.label}>Cross Street:</Text>
            <Text style={styles.text}>{incident.crossStreet}</Text>

            <Text style={styles.label}>Affected Direction:</Text>
            <Text style={styles.text}>{incident.affectedDirection}</Text>
          </View>

          <View style={styles.buttonWrapper}>
            <Button
              title={
                source === 'saved'
                  ? 'Back to Saved Incidents'
                  : 'Back to Incidents'
              }
              onPress={goBackPage}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1eef5',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Arial',
    color: '#222',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
    fontFamily: 'Arial',
    color: '#222',
  },
  text: {
    fontSize: 15,
    fontFamily: 'Arial',
    color: '#333',
  },
  buttonWrapper: {
    marginTop: 8,
  },
});
